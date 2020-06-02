const imports = require('./imports')
const lead = require('./lead')
const logic = require('./logic')
const options = require('./options')

function root(result) {
  return [lead(result), imports(result.imports), options(result), logic(result)]
    .filter((item) => item)
    .join(`\n\n`)
}

module.exports = root
