import path from 'path'
import { model, Schema } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { audit } from '../../../shared/model.js'
import Storage from '../../../shared/storage/index.js'
import { getPath } from './helpers.js'

export const schema = {
  ...audit,
  workflow: {
    type: String
  },
  remoteId: {
    type: String,
    index: true
  },
  error: {
    type: String,
    maxlength: 255
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job'
  },
  storage: {
    type: String,
    lowercase: true,
    required: true,
    index: true,
    enum: ['fs', 'dam'],
    default: 'fs'
  },
  status: {
    type: String,
    index: true,
    lowercase: true,
    required: true,
    default: 'dropped'
  },
  size: {
    type: Number,
    required: true
  },
  dir: {
    type: String,
    index: true,
    lowercase: true
  },
  ext: {
    type: String,
    index: true,
    lowercase: true
  },
  filename: {
    type: String,
    index: true,
    lowercase: true
  },
  path: {
    type: String,
    required: true,
    lowercase: true
  },
  reference: {
    type: String,
    index: true
  },
  md5: {
    type: String,
    required: true,
    index: true
  },
  metadata: {
    type: Object,
    default: {}
  }
}

const Asset = new Schema(schema)

Asset.methods.download = async function () {
  return Storage(this.storage, this.path).download()
}

Asset.methods.updateMetadata = async function (metadata) {
  this.metadata = metadata

  await this.save()
}

Asset.pre('save', function (next) {
  if (this.isModified()) {
    const { base, dir, ext } = path.parse(getPath(this.path))

    this.filename = base
    this.dir = dir
    this.ext = ext.slice(1)

    if ([this.filename, this.dir, this.ext].some(attr => !attr)) {
      throw new Error('Filepath is invalid')
    }
  }

  next()
})

Asset.pre('find', function () {
  this.populate('job')
})

Asset.pre('findOne', function () {
  this.populate('job')
})

Asset.plugin(paginate)

export default model('Asset', Asset)
