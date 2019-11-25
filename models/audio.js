const mongoose = require('mongoose')

const audioSchema = new mongoose.Schema({
  name: String,
  author: String,
  url: String,
})

audioSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Audio', audioSchema)
