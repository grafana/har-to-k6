const check = require('./check')
const object = require('./object')

function checks(spec) {
  if (spec.size) {
    const entries = [...spec].map(([name, item]) => check(name, item))
    return `check(response, ${object(entries)});`
  } else {
    return null
  }
}

module.exports = checks
