const declares = require('./declares')
const flow = require('./flow')
const imports = require('./imports')
const root = require('./root')
const { result: makeResult } = require('../make')

/**
 * Parse HAR archive
 *
 * Assumes valid archive.
 *
 * @param {HAR} archive
 * @param {boolean} persistImports Whether or not to persist imports (automatically used when converting multiple archives)
 * @return {*}
 */
function parse(archive, persistImports = false) {
  const result = makeResult(persistImports)
  root(archive, result)
  flow(result)
  imports(archive, result)
  declares(archive, result)

  return result
}

module.exports = parse
