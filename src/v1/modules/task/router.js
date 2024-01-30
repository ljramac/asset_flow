import { Router } from 'express'
import { get, post, put, patch, getById, flow } from './controller.js'

export default Router().use('/tasks',
  Router()
    .get('/', get)
    .get('/flow/:taskType', flow)
    .post('/', post)
    .get('/:id', getById)
    .put('/:id', put)
    .patch('/:id', patch))
