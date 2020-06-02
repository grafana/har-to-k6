const variable = require('./variable')

function variables(spec) {
  if (spec.size) {
    return [...spec].map(([name, item]) => variable(name, item)).join(`\n`)
  } else {
    return null
  }
}

module.exports = variables
