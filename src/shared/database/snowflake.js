import config from 'config'
import snowflake from 'snowflake-sdk'
import Abstract from './abstract.js'

export default class SnowFlake extends Abstract {
  constructor () {
    super()

    this.client = snowflake.createConnection({
      account: config.get('snowflake.account'),
      username: config.get('snowflake.username'),
      password: process.env.SNOWFLAKE_PASSWORD
    })
  }

  connect () {
    return new Promise((resolve, reject) => {
      this.client.connect((error, connection) => {
        if (error) return reject(error)

        resolve(connection)
      })
    })
  }
}
