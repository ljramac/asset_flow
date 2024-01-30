import md5 from 'md5-file'

export const getMD5 = async (filepath) => await md5(filepath)

export const getPath = uri => {
  try {
    return new URL(uri)?.pathname
  } catch (_error) {
    return uri
  }
}
