import MongoDB from './mongodb.js'
import SnowFlake from './snowflake.js'

export default (type) => {
  switch (type) {
    case 'mongodb':
      return new MongoDB()
    case 'snowflake':
      return new SnowFlake()
    default:
      return new MongoDB()
  }
}
