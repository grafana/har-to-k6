const composite = require('./composite')
const prime = require('./prime')

function template (value) {
  if (Array.isArray(value)) {
    return composite(value)
  } else {
    return prime(value)
  }
}

module.exports = template
