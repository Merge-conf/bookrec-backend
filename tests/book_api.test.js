const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Book = require('../models/book')

const api = supertest(app)

let savedBook

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

  savedBook = await firstBook.save()
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

  test('can be modified', async () => {

    const book = {
      name: '50 shades of blue',
      author: 'Who Cares',
    }
    await api
      .put(`/api/books/${savedBook.id}`)
      .send(book)
      .expect('Content-Type', /application\/json/)

    const bookList = await Book.find({})

    const bookNames = bookList.map(book => book.name)

    expect(bookNames[0]).toBe('50 shades of blue')
  })

  test('can be deleted', async () => {


    await api
      .delete(`/api/books/${savedBook.id}`)
      .expect(204)

    const bookList = await Book.find({})

    expect(bookList.length).toBe(1)

  })

})

afterAll(() => {
  mongoose.connection.close()
})
