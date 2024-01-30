import { Model, endpointHandler } from '../../../shared/factory.js'
import Task from './model.js'

export const get = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Task, req).find())
  }, res)
}

export const getById = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Task, req).findById())
  }, res)
}

export const put = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Task, req).put())
  }, res)
}

export const patch = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Task, req).patch())
  }, res)
}

export const post = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Task, req).post())
  }, res)
}

export const flow = async (req, res) => {
  await endpointHandler(async () => {
    const taskType = req.params.taskType
    const workerId = req.query.workerId

    const task = await Task.popByTaskType(workerId, taskType.split(','))

    if (!task) return res.sendStatus(204)

    res.json(task)
  }, res)
}
