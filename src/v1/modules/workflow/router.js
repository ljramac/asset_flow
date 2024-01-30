import { Router } from 'express'
import { get, post, put, patch, getById } from './controller.js'

export default Router().use('/workflows',
  Router()
    .get('/', get)
    .post('/', post)
    .get('/:id', getById)
    .put('/:id', put)
    .patch('/:id', patch))
