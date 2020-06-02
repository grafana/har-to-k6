const composite = require('./composite')
const prime = require('./prime')

function string(value, delimiter) {
  if (Array.isArray(value)) {
    return composite(value, delimiter)
  } else {
    return prime(value)
  }
}

module.exports = string
