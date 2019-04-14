const imports = require('./imports')
const logic = require('./logic')
const options = require('./options')

function root (result) {
  return [
    imports(result),
    options(result),
    logic(result)
  ].filter(item => item).join(`\n\n`)
}

module.exports = root
