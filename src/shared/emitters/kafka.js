import config from 'config'
import kafka from 'kafka-node'
import getLogger from '../logger.js'

const logger = getLogger()

export default class KafkaEmitter {
  constructor (topic) {
    this.topic = topic
    this.connect = this.connect.bind(this)
  }

  async waitForReady () {
    if (KafkaEmitter.producer?.ready) return

    await new Promise(resolve => setTimeout(resolve, 1000))

    return await this.waitForReady()
  }

  setupEventHandlers () {
    KafkaEmitter.producer.on('ready', () => {
      logger.info('Kafka producer ready')
    })

    KafkaEmitter.producer.on('error', this.connect)
  }

  async connect (error = null) {
    if (error) {
      logger.error(error)
    }

    if (!KafkaEmitter.producer?.ready) {
      KafkaEmitter.producer?.removeAllListeners()
      KafkaEmitter.client?.close()

      KafkaEmitter.client = new kafka.KafkaClient({ kafkaHost: KafkaEmitter.kafkaHost })
      KafkaEmitter.producer = new kafka.Producer(KafkaEmitter.client)
      this.setupEventHandlers()
    }

    await this.waitForReady()
  }

  async send (messages) {
    await this.connect()

    const payloads = [messages].flat().map((message, index) => ({
      topic: this.topic,
      messages: typeof message === 'object' ? JSON.stringify(message) : message,
      partition: index
    }))

    await new Promise((resolve, reject) => {
      KafkaEmitter.producer.send(payloads, (error, data) => {
        if (error) return reject(error)

        resolve(data)
      })
    }).finally(() => {
      logger.debug(`[KAFKA] ${JSON.stringify(messages)}`)
    })
  }
}

KafkaEmitter.kafkaHost = config.get('kafka.host')
KafkaEmitter.client = null
KafkaEmitter.producer = null
