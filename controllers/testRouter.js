const testRouter = require('express').Router()
const Book = require('../models/book')

testRouter.post('/reset', async(req, res) =>{
  await Book.deleteMany({})

  res.status(204).end()
})

module.exports = testRouter