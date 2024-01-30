import config from 'config'
import Emmiter from '../../../shared/emitters/index.js'
import { rejectIn } from '../../../shared/helpers.js'
import { endpointHandler } from '../../../shared/factory.js'

export const publish = async (req, res) => {
  await endpointHandler(async () => {
    const emmiter = Emmiter('kafka', config.get('kafka.asset_topic'))

    const messages = await Promise.race([rejectIn(20000, 'Kafka timeout'), emmiter.send(req.assets)])

    res.json({ assets: req.assets, messages })
  }, res)
}
