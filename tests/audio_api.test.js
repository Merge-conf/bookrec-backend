const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Audio = require('../models/audio')

const api = supertest(app)

beforeEach(async () => {
  await Audio.deleteMany({})

  const firstAudio = new Audio({
    name: 'Song for testing',
    creator: 'Authorized testAuthor',
    url: 'testurl.fi',
  })

  const secondAudio = new Audio({
    name: 'Testing in audio',
    creator: 'The test podcast',
    url: 'someothertesturl.fi',
  })

  await firstAudio.save()
  await secondAudio.save()
})

describe('audios', () => {
  test('all audios are returned', async () => {
    const result = await api
      .get('/api/audios')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body[0].name).toBe('Song for testing')
    expect(result.body[0].creator).toBe('Authorized testAuthor')
    expect(result.body[0].url).toBe('testurl.fi')
    expect(result.body[1].name).toBe('Testing in audio')
    expect(result.body[1].creator).toBe('The test podcast')
    expect(result.body[1].url).toBe('someothertesturl.fi')
  })
})

afterAll(() => {
  mongoose.connection.close()
})