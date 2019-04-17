const flow = require('./flow')
const root = require('./root')
const { result: makeResult } = require('../make')

/*
 * Parse HAR archive
 *
 * Assumes valid archive.
 */
function parse (archive) {
  const result = makeResult()
  root(archive, result)
  flow(result)
  return result
}

module.exports = parse
