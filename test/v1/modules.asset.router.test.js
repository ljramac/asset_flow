import handlers from '../handlers.js'
import request from 'supertest'
import application from '../../src/main'

describe('/api/v1/assets', () => {
  beforeAll(handlers.beforeAll)
  afterAll(handlers.afterAll)

  it('It should respond with status 200', async () => {
    const app = await application()
    const response = await request(app).get('/api/v1/assets')

    expect(response.statusCode).toBe(200)
  })
})
