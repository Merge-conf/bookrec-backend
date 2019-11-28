const audioRouter = require('express').Router()
const Audio = require('../models/audio')

audioRouter.get('/', async (req, res, next) => {
  try {
    const audios = await Audio.find({})
    res.json(audios.map((audio) => audio.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

audioRouter.post('/', async (req, res, next) => {
  const { body } = req

  const audio = new Audio({
    name: body.name,
    creator: body.creator,
    url: body.url,
  })

  try {
    const savedAudio = await audio.save()
    res.json(savedAudio.toJSON())
  } catch (exception) {
    next(exception)
  }
})

audioRouter.put('/:id', async (req, res, next) => {
  const { body } = req

  const audio = {
    name: body.name,
    creator: body.creator,
    url: body.url,
  }

  try {
    const updatedAudio = await Audio.findByIdAndUpdate(req.params.id, book, { new: true })
    res.json(updatedAudio)
  } catch (exception) {
    next(exception)
  }
})

module.exports = audioRouter
