
const mongoose = require('mongoose')
const logger = require('../utils/logger')

const url = process.env.DB_URI

logger.info('connecting to', url)

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
})

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Book', bookSchema)
