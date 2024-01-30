import mongoose from 'mongoose'
import path from 'path'
import Asset from './model.js'
import Job from '../job/model.js'
import { Model, endpointHandler } from '../../../shared/factory.js'
import { getMD5 } from './helpers.js'

export const get = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Asset, req).find())
  }, res)
}

export const getById = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Asset, req).findById())
  }, res)
}

export const put = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Asset, req).put())
  }, res)
}

export const patch = async (req, res) => {
  await endpointHandler(async () => {
    res.json(await new Model(Asset, req).patch())
  }, res)
}

export const create = async (req, res) => {
  await endpointHandler(async () => {
    req.assets = []

    for (const asset of [req.body?.assets ?? []].flat()) {
      try {
        req.assets.push(await new Model(Asset, {
          body: {
            ...asset,
            job: new mongoose.Types.ObjectId()
          }
        }).post())
      } catch (error) {
        req.assets.push(error)
      }
    }
  }, res)
}

export const upload = async (req, res) => {
  await endpointHandler(async () => {
    req.assets = []

    for (const file of req?.files ?? []) {
      try {
        const username = req?.auth?.username ?? 'anonymous'

        req.audit = {
          createdBy: username,
          updatedBy: username
        }

        const asset = await Asset.create({
          ...req.body,
          filename: file.originalname,
          size: file.size,
          path: path.resolve(file.path),
          md5: await getMD5(file.path),
          ...req.audit,
          job: new mongoose.Types.ObjectId()
        })

        req.assets.push(asset)
      } catch (error) {
        req.assets.push({ message: error.message })
      }
    }
  }, res)
}

export const saveAssets = async (req, res, next) => {
  await endpointHandler(async () => {
    if (req.files?.length) {
      await upload(req, res)
    } else if (req.body?.assets) {
      await create(req, res)
    } else {
      return res.sendStatus(400)
    }

    if (req?.assets?.every(a => !a?._id)) {
      const errors = req?.assets.map(a => a?.message).filter(Boolean)

      throw new Error(JSON.stringify(errors))
    }

    await next()
  }, res)
}

export const progress = async (req, res, next) => {
  await endpointHandler(async () => {
    const workflow = req?.body?.workflow ?? null
    const assets = req?.assets ?? []

    for (const asset of assets) {
      if (asset?._id) continue

      const job = await Job.create({
        _id: asset?.job,
        ...req.audit,
        workflow: asset?.workflow ?? workflow,
        entity: {
          name: 'asset',
          id: asset?._id?.toString()
        }
      })

      await job.progress(asset?._doc ?? asset)
    }

    await next()
  }, res)
}

export const sendAssets = async (req, res) => {
  await endpointHandler(async () => {
    res.json(req?.assets ?? [])
  }, res)
}

export const download = async (req, res) => {
  await endpointHandler(async () => {
    const asset = await new Model(Asset, req).findById(req.params.id)

    if (asset.storage === 'fs') {
      return res.download(asset.path, error => {
        if (error) throw error
      })
    }

    const stream = await asset.download()

    res.setHeader('Content-Disposition', `attachment; filename=${asset.filename}.${asset.ext}`)

    await stream.pipe(res)
  }, res)
}
