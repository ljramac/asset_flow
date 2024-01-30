import { Router } from 'express'
import { get, getById } from './controller.js'

export default Router().use('/jobs',
  Router()
    .get('/', get)
    .post('/search', get)
    .get('/:id', getById))
