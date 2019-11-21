const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Book = require('../models/book')

const api = supertest(app)

beforeEach(async () => {
  await Book.deleteMany({})

  const firstBook = new Book({
    name: '50 shades of gray',
    author: 'Who Cares',
  })

  const secondBook = new Book({
    name: '51 shades of gray',
    author: 'Slum Master',
  })

  await firstBook.save()
  await secondBook.save()
})

describe('books', () => {
  test('are all returned', async () => {
    const result = await api
      .get('/api/books')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body[0].name).toBe('50 shades of gray')
    expect(result.body[0].author).toBe('Who Cares')
    expect(result.body[1].name).toBe('51 shades of gray')
    expect(result.body[1].author).toBe('Slum Master')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
