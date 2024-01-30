import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.resolve('./uploads/')),
  filename: (req, file, cb) => cb(null, file.originalname)
})

export const upload = multer({ storage }).array('files')
