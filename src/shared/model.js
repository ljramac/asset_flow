const defaultDate = () => Date.now()

export const audit = {
  createdAt: {
    type: Date,
    index: true,
    default: defaultDate
  },
  updatedAt: {
    type: Date,
    index: true,
    default: defaultDate
  },
  deletedAt: {
    type: Date
  },
  createdBy: {
    type: String,
    index: true,
    default: 'unknown'
  },
  updatedBy: {
    type: String,
    index: true,
    default: 'unknown'
  }
}
