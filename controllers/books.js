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

module.exports = bookRouter
