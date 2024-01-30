import axios from 'axios'
import Abstract from './abstract.js'
import getLogger from '../logger.js'

const logger = getLogger()

export default class DamStorage extends Abstract {
  constructor (fileUrl) {
    super()

    this.fileUrl = fileUrl
  }

  async download () {
    try {
      const result = await axios({
        method: 'GET',
        url: this.fileUrl,
        responseType: 'stream'
      })

      if (!result?.data?.pipe) {
        throw new Error('File not found')
      }

      return result.data
    } catch (error) {
      logger.error(error)

      throw error
    }
  }
}
