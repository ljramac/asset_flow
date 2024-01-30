import express from 'express'
import routines from './routines/index.js'
import initiators from './shared/initiators/index.js'
import middlewares from './middlewares/index.js'
import publicRouter from './public/router.js'
import v1 from './v1/index.js'
import v2 from './v2/index.js'
import getLogger from './shared/logger.js'

const logger = getLogger()

export default async () => {
  const PORT = process.env.PORT || 8080

  const app = express()

  await routines()
  await initiators()

  for (const middlewareList of middlewares) {
    app.use(...middlewareList.map(middleware => middleware()).flat(Infinity))
  }

  app.use('/', publicRouter)
  app.use('/api', v1.router, v2.router)

  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`)
  })

  return app
}
