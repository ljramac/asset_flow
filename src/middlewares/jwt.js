import { expressjwt } from 'express-jwt'

export default () => {
  const options = {
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
  }

  const skipPaths = { path: ['/credentials', '/authenticate', /\/api\/.*\/assets\/download\/.*/] }

  return expressjwt(options).unless(skipPaths)
}
