import Kafka from './kafka.js'

export default (type, topic) => {
  switch (type) {
    case 'kafka':
      return new Kafka(topic)
  }
}
