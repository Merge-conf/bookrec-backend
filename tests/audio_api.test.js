const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Audio = require('../models/audio')

const api = supertest(app)

let savedAudio

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

  savedAudio = await firstAudio.save()
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

  test('can be added', async () => {
    const testAudio = new Audio({
      name: 'Testaudio',
      creator: 'Testcreator',
      url: 'testurl',
    })

    await api
      .post('/api/audios')
      .send(testAudio)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const audioList = await Audio.find({})

    const audioNames = audioList.map(audio => audio.name)

    expect(audioNames[2]).toBe('Testaudio')

  })

  test('cannot be added without name', async () => {
    const testAudio = new Audio({
      creator: 'Testcreator',
      url: 'testurl',
    })

    await api
      .post('/api/audios')
      .send(testAudio)
      .expect(400)

  })

  test('cannot be added without url', async () => {
    const testAudio = new Audio({
      name: 'Testaudio',
      creator: 'Testcreator',
    })

    await api
      .post('/api/audios')
      .send(testAudio)
      .expect(400)

  })

  test('can be modified', async () => {

    const audio = {
      name: 'Song for testing; modified edition',
      creator: 'Authorized testAuthor',
      url: 'testurl.fi',
    }
    await api
      .put(`/api/audios/${savedAudio.id}`)
      .send(audio)
      .expect('Content-Type', /application\/json/)

    const audioList = await Audio.find({})

    const audioNames = audioList.map(audio => audio.name)

    expect(audioNames[0]).toBe('Song for testing; modified edition')
  })

  test('can be deleted', async () => {


    await api
      .delete(`/api/audios/${savedAudio.id}`)
      .expect(204)

    const audioList = await Audio.find({})

    expect(audioList.length).toBe(1)

  })

})




afterAll(() => {
  mongoose.connection.close()
})