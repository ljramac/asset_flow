import config from 'config'
import Auth from '../shared/authentication/index.js'

export const validateUser = async (username, password) => {
  return await Auth(config.get('auth.type'), { username, password }).authenticate()
}
