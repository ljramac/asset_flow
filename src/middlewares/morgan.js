import morgan from 'morgan'
import getLogger from '../shared/logger.js'

const logger = getLogger()

export default () => {
  morgan.token('id', req => req.id)

  const stream = {
    write: (message) => {
      logger.info(message)
    }
  }

  return morgan('combined', { stream })
}
