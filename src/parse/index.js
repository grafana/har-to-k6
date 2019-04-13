const root = require('./root')
const { makeResult } = require('../aid')

/*
 * Parse HAR archive
 *
 * Assumes valid archive.
 */
function parse (archive) {
  const result = makeResult()
  root(archive, result)
  return result
}

module.exports = parse
