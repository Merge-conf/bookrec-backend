const exp = require('express')
const logger = require('./utils/logger')

const app = exp()

require('dotenv').config()

const PORT = process.env.PORT || 3000

app.get('/', (reg, res) => {
  logger.info('Book review')
  res.send('<h1>Hello book review</h1>')
})

app.listen(PORT, () => {
  logger.info(`Àpp running in port ${PORT}`)
})
