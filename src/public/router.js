import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { endpointHandler } from '../shared/factory.js'
import { validateUser } from './controller.js'
import getLogger from '../shared/logger.js'

const logger = getLogger()

export default Router()
  .post('/authenticate', async (req, res) => {
    await endpointHandler(async () => {
      const { username, password } = req.body

      const validatedUser = await validateUser(username, password)

      if (!validatedUser) return res.sendStatus(401)

      const token = jwt.sign(validatedUser, process.env.JWT_SECRET, { expiresIn: '10h' })

      res.json({ token })
    }, res)
  })
  .get('/credentials', async (req, res) => {
    await endpointHandler(async () => {
      const token = req.headers.authorization?.split(' ')[1]

      if (!token) return res.sendStatus(401)

      const user = await new Promise(resolve => {
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
          if (error) {
            logger.error(error)

            return res.sendStatus(403)
          }

          resolve(user)
        })
      })

      res.json(user)
    }, res)
  })
