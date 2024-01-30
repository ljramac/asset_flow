import path from 'path'

export default class StorageAbstract {
  normalize (filepath) {
    return path.normalize(filepath)
  }

  download () {
    throw new Error('Not implemented')
  }
}
