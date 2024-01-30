import env from './env.js'
import database from './database.js'

export default async () => {
  for (const i of [env, database]) {
    await i()
  }
}
