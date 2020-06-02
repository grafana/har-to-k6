const cookie = require('./cookie')
const object = require('./object')

function cookies(spec) {
  if (spec.size) {
    const entries = [...spec].map(([name, item]) => cookie(name, item))
    return object(entries)
  } else {
    return null
  }
}

module.exports = cookies
