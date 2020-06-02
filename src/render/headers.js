const header = require('./header')
const object = require('./object')

function headers(spec) {
  if (spec.size) {
    const entries = [...spec].map(([name, items]) => header(name, items))
    return object(entries)
  } else {
    return null
  }
}

module.exports = headers
