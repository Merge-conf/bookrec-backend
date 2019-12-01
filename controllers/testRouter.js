const testRouter = require('express').Router()
const Book = require('../models/book')
const Audio = require('../models/audio')

testRouter.post('/reset', async(req, res) =>{
  await Book.deleteMany({})
  await Audio.deleteMany({})

  res.status(204).end()
})

module.exports = testRouter