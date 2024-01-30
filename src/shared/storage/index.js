import Dam from './dam.js'

export default (type, path) => {
  switch (type) {
    case 'dam':
      return new Dam(path)
  }
}
