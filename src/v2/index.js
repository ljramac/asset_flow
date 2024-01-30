import { Router } from 'express'
import assetRouter from './modules/asset/router.js'

export default {
  router: Router().use('/v2', assetRouter)
}
