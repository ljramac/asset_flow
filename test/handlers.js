import mongoose from 'mongoose'

const beforeAll = async () => {
  // jest.setTimeout(5000)
}

const afterAll = async () => {
  const collections = Object.keys(mongoose.connection.collections)

  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }

  await mongoose.connection.close()
}

export default {
  beforeAll,
  afterAll
}
