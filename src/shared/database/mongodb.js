import mongoose from 'mongoose'
import Abstract from './abstract.js'
import getLogger from '../logger.js'

const logger = getLogger()

export default class MongoDB extends Abstract {
  constructor () {
    super()

    this.connectionString = process.env.MONGODB_CONN_STRING
  }

  async connect () {
    await mongoose.connect(this.connectionString)

    logger.info('Database connected')
  }
}
