import { Router } from 'express'
import { upload as multer } from './middlewares.js'
import { get, saveAssets, progress, put, patch, getById, sendAssets, download } from './controller.js'

export default Router().use('/assets',
  Router()
    .get('/', get)
    .get('/download/:id', download)
    .post('/', multer, saveAssets, progress, sendAssets)
    .post('/search', get)
    .get('/:id', getById)
    .put('/:id', put)
    .patch('/:id', patch))
