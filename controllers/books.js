const bookRouter = require('express').Router()
const Book = require('../models/book')

bookRouter.get('/', async (req, res, next) => {
  try {
    const books = await Book.find({})
    res.json(books.map((book) => book.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

bookRouter.post('/', async (req, res, next) => {
  const { body } = req

  const book = new Book({
    name: body.name,
    author: body.author,
  })

  try {
    const savedBook = await book.save()
    res.json(savedBook.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = bookRouter
