import paginate from 'mongoose-paginate-v2'
import { model, Schema } from 'mongoose'
import { audit } from '../../../shared/model.js'

const Workflow = new Schema({
  ...audit,
  name: {
    type: String,
    required: true,
    index: { unique: true }
  },
  description: {
    type: String,
    required: true
  },
  steps: {
    type: [new Schema({
      name: {
        type: String,
        required: true,
        index: true
      },
      description: {
        type: String,
        required: true
      },
      timeoutLimit: {
        type: Number,
        required: true,
        default: 30000
      },
      retryLimit: {
        type: Number,
        required: true,
        default: 3
      }
    })],
    required: true
  }
})

Workflow.plugin(paginate)

export default model('Workflow', Workflow)
