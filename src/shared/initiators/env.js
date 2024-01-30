import { resolve } from 'path'
import { config } from 'dotenv'

export default async () => {
  config({
    path: resolve(`./env/${process.env.NODE_ENV ?? 'local'}.env`)
  })
}
