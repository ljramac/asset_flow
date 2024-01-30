import config from 'config'
import Agenda from 'agenda'
import Job from '../v1/modules/job/model.js'
import Asset from '../v1/modules/asset/model.js'
import Workflow from '../v1/modules/workflow/model.js'
import Task from '../v1/modules/task/model.js'
import getLogger from '../shared/logger.js'

const logger = getLogger()

export default async () => {
  try {
    const routineName = 'db_to_snowflake'
    const routine = config.get(`routines.${routineName}`)

    if (!routine.enabled) {
      return logger.debug(`${routineName} routine disabled`)
    }

    const agenda = new Agenda({ db: { address: process.env.MONGODB_CONN_STRING } })

    agenda.on('ready', () => {
      logger.debug(`${routineName} routine ready`)

      agenda.on('error', logger.error)

      agenda.define(routineName, async () => {
        try {
          logger.debug(`${routineName} routine started`)

          for (const model of [Job, Asset, Workflow, Task]) {
            const cursor = model.find({
              createdAt: {
                $gte: new Date().setHours(new Date().getHours() - 12)
              }
            }).lean().cursor()

            for await (const doc of cursor) {
              try {
                console.log(doc)
                // TODO: Write to Snowflake
              } catch (error) {
                logger.error(error)
              }
            }
          }
        } catch (error) {
          logger.error(error)
        }
      })

      agenda.start()

      agenda.every(routine.cron, routineName)
    })
  } catch (error) {
    logger.error(error)
  }
}
