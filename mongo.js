
/*
  Mock file to test the database
  run with:
  >node mongo.js
*/

require('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.DB_URI

mongoose.connect(url, { useNewUrlParser: true })

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
})

const Book = mongoose.model('Book', bookSchema)

const book = new Book({
    name: 'Adventures of MrMerge collection',
    author: 'MrMerge',
})

book.save().then((response) => {
    console.log('book saved!')
    mongoose.connection.close()
})
