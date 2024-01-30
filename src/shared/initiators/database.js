import config from 'config'
import Database from '../database/index.js'

export default async () => {
  await Database(config.get('database.type')).connect()
}
