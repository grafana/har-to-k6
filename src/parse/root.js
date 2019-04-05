const isPlainObject = require('is-plain-object')
const log = require('./log')
const { InvalidArchiveError } = require('../error')

function root (node, result) {
  validate(node)
  log(node.log, result)
}

function validate (node) {
  if (!isPlainObject(node)) {
    throw new InvalidArchiveError('Missing root node')
  }
  if (!isPlainObject(node.log)) {
    throw new InvalidArchiveError('Missing log section')
  }
}

module.exports = root
