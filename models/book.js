
const mongoose = require('mongoose')

const url = process.env.DB_URI

console.log('connecting to', url)

mongoose
    .connect(url, { useNewUrlParser: true })
    .then((result) => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
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
