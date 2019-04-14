const imports = require('./imports')
const logic = require('./logic')
const options = require('./options')

function root (result) {
  return [
    imports(result),
    options(result),
    logic(result)
  ].join(`\n\n`)
}

module.exports = root
