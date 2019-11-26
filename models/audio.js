const mongoose = require('mongoose')

const audioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: String,
  url: {
    type: String,
    required: true,
  },
})

audioSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Audio', audioSchema)
