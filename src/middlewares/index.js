import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from './morgan.js'
import docs from './docs.js'
import jwt from './jwt.js'

export default [
  [
    () => [express.json()],
    () => [express.urlencoded({ extended: true })],
    () => [cors()],
    () => [helmet()],
    () => [morgan()],
    () => [jwt()]
  ],
  [() => docs()]
]
