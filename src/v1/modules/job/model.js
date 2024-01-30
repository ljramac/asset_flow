import { model, Schema } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { audit } from '../../../shared/model.js'
import Task from '../task/model.js'

export const schema = {
  ...audit,
  remoteId: {
    type: String,
    index: true
  },
  error: {
    type: String,
    maxlength: 255
  },
  workflow: {
    type: Schema.Types.ObjectId,
    ref: 'Workflow',
    required: true,
    validate: (_id) => {
      return model('Workflow').exists({ _id })
    }
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }
  ],
  status: {
    type: String,
    index: true,
    lowercase: true,
    required: true,
    default: 'dropped'
  },
  entity: {
    type: new Schema({
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    })
  },
  metadata: {
    type: Object,
    default: {}
  }
}

const Job = new Schema(schema)

Job.methods.updateStatus = async function (status) {
  this.status = status

  await this.save()
}

Job.methods.progress = async function (metadata = {}) {
  await Promise.all([this.populate('tasks'), this.populate('workflow')])

  const definition = this?.workflow?.steps?.[this?.tasks?.length ?? 0]

  if (!definition) {
    this.updateStatus('aborted')

    throw new Error('Cannot locate workflow definition')
  }

  const createdBy = this.createdBy
  const createdAt = this.createdAt
  const _auditAttrs = { createdBy, createdAt, updatedBy: createdBy, updatedAt: createdAt }

  const inputData = Object.assign({}, this.metadata, metadata)
  const { name: taskType, retryLimit, timeoutLimit } = definition

  const newTask = {
    ..._auditAttrs,
    taskType,
    retryLimit,
    timeoutLimit,
    inputData,
    job: this._id
  }

  const task = await Task.create(newTask)

  this.tasks.push(task._id)

  await this.save()
}

Job.pre('find', function () {
  this.populate('workflow')
  this.populate('tasks')
})

Job.pre('findOne', function () {
  this.populate('workflow')
  this.populate('tasks')
})

Job.plugin(paginate)

export default model('Job', Job)
