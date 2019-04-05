const root = require('./root')
const { makeResult } = require('../aid')

function parse (archive) {
  const result = makeResult()
  archive(root, result)
  return result
}

module.exports = parse
