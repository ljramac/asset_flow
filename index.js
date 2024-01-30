import application from './src/main.js'
import path from 'path'
import { config } from 'dotenv'

const env = process.env.NODE_ENV ?? 'local'

config({ path: path.resolve(`./env/${env}.env`) })

application()
