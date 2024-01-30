import { Model, endpointHandler } from '../../../shared/factory.js'
import Job from './model.js'

export const get = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Job, req).find())
  }, res)
}

export const getById = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Job, req).findById())
  }, res)
}
