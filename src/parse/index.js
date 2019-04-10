const root = require('./root')
const { makeResult } = require('../aid')

/*
 * Parse HAR archive
 *
 * Assumes valid archive.
 */
function parse (archive) {
  const result = makeResult()
  archive(root, result)
  return result
}

module.exports = parse
