/* eslint no-console: 0 */

const info = (...params) => {
  if (
    process.env.NODE_ENV !== 'test'
    && process.env.NODE_ENV !== 'production'
  ) {
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(...params)
  }
}

module.exports = {
  info,
  error,
}
