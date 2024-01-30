import { Router } from 'express'
import { upload as multer } from '../../../v1/modules/asset/middlewares.js'
import { get, saveAssets, put, patch, getById, sendAssets, download } from '../../../v1/modules/asset/controller.js'
import { publish } from './controller.js'

export default Router().use('/assets',
  Router()
    .get('/', get)
    .get('/download/:id', download)
    .post('/', multer, saveAssets, publish, sendAssets)
    .post('/search', get)
    .get('/:id', getById)
    .put('/:id', put)
    .patch('/:id', patch))
