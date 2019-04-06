const isPlainObject = require('is-plain-object')
const log = require('./log')
const { InvalidArchiveError } = require('../error')

function root (node) {
  validate(node)
  log(node.log)
}

function validate (node) {
  if (!isPlainObject(node)) {
    throw new InvalidArchiveError(
      { name: 'MissingRoot' },
      'Missing root node'
    )
  }
  if (!isPlainObject(node.log)) {
    throw new InvalidArchiveError(
      { name: 'MissingLog' },
      'Missing log section'
    )
  }
}

module.exports = root
