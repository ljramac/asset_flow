beforeAll(() => {
  global.logger.log = jest.fn()
  global.logger.error = jest.fn()
  global.logger.warn = jest.fn()
})
