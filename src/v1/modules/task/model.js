import paginate from 'mongoose-paginate-v2'
import mongoose, { model, Schema } from 'mongoose'
import { audit } from '../../../shared/model.js'
import getLogger from '../../../shared/logger.js'

const logger = getLogger()

const schema = new Schema({
  ...audit,
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job'
  },
  taskType: {
    required: true,
    type: String,
    index: true
  },
  status: {
    type: String,
    index: true,
    default: 'scheduled'
  },
  inputData: {
    type: 'Object',
    required: true,
    default: {}
  },
  workerId: {
    type: String,
    index: true
  },
  startedAt: {
    type: Date
  },
  timeoutLimit: {
    type: Number,
    required: true,
    default: 3000
  },
  retryLimit: {
    type: Number,
    required: true,
    default: 3
  },
  retryCount: {
    type: Number,
    required: true,
    default: 0
  },
  error: {
    type: String
  },
  finishedAt: {
    type: Date,
    index: true
  },
  outputData: {
    type: 'Object',
    default: {}
  }
})

const markAs = async (status, taskId) => {
  const task = await Task.findById(taskId)

  if (task.status !== 'running') return

  task.status = status
  task.retryCount += 1

  await task.save()
}

schema.post('save', async function (doc) {
  await doc.updateJobStatus()
})

schema.statics.popByTaskType = async (workerId, taskTypes) => {
  const session = await mongoose.startSession()

  session.startTransaction()

  try {
    const last12h = new Date(new Date().getTime() - 12 * 60 * 60 * 1000)

    const scheduled = await Task.aggregate([
      { $match: { status: 'scheduled', taskType: { $in: taskTypes }, createdAt: { $gt: last12h } } },
      { $sort: { createdAt: 1 } },
      { $group: { _id: '$createdBy', taskId: { $first: '$_id' } } }
    ]).session(session)

    if (!scheduled.length) {
      await session.abortTransaction()

      return null
    }

    const lastOut = await Task.aggregate([
      { $match: { status: { $ne: 'scheduled' }, taskType: { $in: taskTypes }, createdAt: { $gt: last12h } } },
      { $sort: { updatedAt: -1 } },
      { $group: { _id: '$createdBy', updatedAt: { $first: '$updatedAt' } } }
    ]).session(session)

    const priorityQueue = lastOut.reduce((acc, { _id, updatedAt }) => {
      acc[_id] = updatedAt
      return acc
    }, {})

    const priorized = scheduled.sort((a, b) => {
      const latestA = priorityQueue[a._id]
      const latestB = priorityQueue[b._id]

      if (latestA && latestB) {
        return latestA < latestB ? -1 : 1
      }

      return a.createdAt < b.createdAt ? -1 : 1
    })

    const now = new Date()

    const attrs = {
      status: 'running',
      updatedAt: now,
      startedAt: now,
      workerId
    }

    const task = await Task.findById(priorized[0].taskId).populate('job').session(session)

    Object.assign(task, attrs)

    await task.save()

    await session.commitTransaction()

    const status = task.retryCount < task.retryLimit ? 'scheduled' : 'timedout'

    setTimeout(() => markAs(status, task._id), task.timeoutLimit)

    return task
  } catch (error) {
    await session.abortTransaction()

    if (/WriteConflict/.test(error.message)) return

    logger.error(error)
  } finally {
    session.endSession()
  }
}

schema.statics.sweepStale = async () => {
  const thirtySecondsAgo = new Date(new Date() - 60 * 1000)

  const res = await Task.updateMany(
    { status: 'running', updatedAt: { $lt: thirtySecondsAgo } },
    { $inc: { retryCount: 1 }, status: 'scheduled' }
  )

  const message = `${res.nModified} tasks marked as scheduled`

  return { message }
}

schema.methods.updateJobStatus = async function () {
  try {
    await this.populate('job')

    this.job.status = this.status
    this.job.error = this.error?.message ?? this.error?.substring(0, 200)

    this.job.updatedAt = Date.now()

    if (this.status === 'completed') {
      await this.job.progress(this.outputData)
    }

    await this.job.save()
  } catch (error) {
    logger.error(error)
  }
}

schema.plugin(paginate)

const Task = model('Task', schema)

export default Task
