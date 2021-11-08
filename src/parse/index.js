const declares = require('./declares')
const flow = require('./flow')
const imports = require('./imports')
const root = require('./root')
const { result: makeResult } = require('../make')

function parse(archive) {
  const result = makeResult()
  root(archive, result)
  flow(result)
  imports(archive, result)
  declares(archive, result)

  return result
}

module.exports = parse
