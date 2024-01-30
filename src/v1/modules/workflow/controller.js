import { Model, endpointHandler } from '../../../shared/factory.js'
import Workflow from './model.js'

export const get = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Workflow, req).find())
  }, res)
}

export const getById = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Workflow, req).findById())
  }, res)
}

export const put = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Workflow, req).put())
  }, res)
}

export const patch = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Workflow, req).patch())
  }, res)
}

export const post = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Workflow, req).post())
  }, res)
}
