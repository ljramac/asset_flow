import getLogger from '../shared/logger.js'

const logger = getLogger()

export class Model {
  constructor (model, req = {}) {
    this.model = model
    this.username = req?.auth?.username ?? 'anonymous'

    const query = req?.query ?? {}
    const body = req?.body ?? {}
    const params = req?.params ?? {}

    this.params = Object.assign(query, body, params)
    this.options = {
      page: parseInt(this.params?.page ?? 1),
      limit: parseInt(this.params?.limit ?? 10),
      sort: this.params?.sort ?? { createdAt: 1 }
    }

    this.payload = Object.keys(this.params).reduce((dict, key) => {
      if (Object.keys(this.model.schema.paths).includes(key)) {
        dict[key] = this.params[key]
      }

      return dict
    }, {})

    this.payload.updatedBy = this.username
  }

  async find () {
    try {
      return await this.model.paginate(this.params?.filter ?? {}, this.options)
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  async findOne () {
    try {
      return await this.model.findOne(this.params?.filter)
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  async findById () {
    try {
      return await this.model.findById(this.params.id)
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  async patch () {
    try {
      return await this.model.findOneAndUpdate({ _id: this.params?.id }, { $set: this.payload })
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  async put () {
    try {
      const doc = await this.findById()

      Object.keys(doc.toObject()).forEach((key) => {
        if (!this.payload[key]) {
          return delete doc[key]
        }

        doc[key] = this.payload[key]
      })

      return await doc.save()
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  async post () {
    try {
      return await this.model.create({
        createdBy: this.username,
        ...this.payload
      })
    } catch (error) {
      logger.error(error)

      throw error
    }
  }
}

export const endpointHandler = async (func, res) => {
  try {
    await func()
  } catch (error) {
    logger.error(error)

    res.status(500).json(
      {
        message: error?.message ?? error,
        ...process.env.NODE_ENV !== 'pro' ? { stack: error?.stack } : {}
      }
    )
  }
}
