require('dotenv').config()

const PORT = process.env.PORT || 3000

let DB_URI
if (process.env.NODE_ENV === 'test') {
  DB_URI = process.env.TEST_DB_URI
} else {
  DB_URI = process.env.DB_URI
}

module.exports = { PORT, DB_URI }
