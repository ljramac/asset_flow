import config from 'config'
import { Client } from '@opensearch-project/opensearch'

export default class Search {
  constructor (schema) {
    this.schema = schema
    this.client = new Client({ node: config.get('opensearch.host') })
  }

  async createIndex () {
    await this.client.indices.create(this.schema)
  }

  async deleteIndex () {
    await this.client.indices.delete({ index: this.schema.index })
  }

  async indexDocument (document) {
    await this.client.index({
      index: this.schema.index,
      body: document
    })
  }

  async search (query) {
    const { body } = await this.client.search({
      index: this.schema.index,
      body: query
    })

    return body
  }
}
