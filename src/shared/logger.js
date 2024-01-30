import config from 'config'
import winston from 'winston'

let logger = null

export default () => {
  if (logger) return logger

  logger = winston.createLogger({
    level: config.get('log.level'),
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
    defaultMeta: { service: 'assets_flow' },
    transports: [
      // new winston.transports.File({ filename: 'error.log', level: 'error' }),
      // new winston.transports.File({ filename: 'combined.log' })
    ]
  })

  if (process.env.NODE_ENV !== 'pro') {
    logger.add(new winston.transports.Console({
      format:
        winston.format.printf(info => {
          const text = `${new Date(info.timestamp).toLocaleString()} [${info.level.toUpperCase()}] ${info.message}`

          return text
        })
    }))
  }

  return logger
}
