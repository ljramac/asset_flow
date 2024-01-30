import { Router } from 'express'
import assetRouter from './modules/asset/router.js'
import taskRouter from './modules/task/router.js'
import wfRouter from './modules/workflow/router.js'

export default {
  router: Router().use('/v1', assetRouter, taskRouter, wfRouter)
}
