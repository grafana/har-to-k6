const isPlainObject = require('is-plain-object')
const log = require('./log')
const { InvalidArchiveError } = require('../error')

/*
 * root: required object
 * log: required object
 */
function root(node, assay) {
  validate(node)
  log(node.log, assay)
}

function validate(node) {
  if (!isPlainObject(node)) {
    throw new InvalidArchiveError(
      { name: 'MissingRoot' },
      'Root node is required'
    )
  }
  if (!('log' in node)) {
    throw new InvalidArchiveError(
      { name: 'MissingLog', path: 'log' },
      'Log section is required'
    )
  }
  if (!isPlainObject(node.log)) {
    throw new InvalidArchiveError(
      { name: 'InvalidLog', path: 'log' },
      'Log section must be a plain object'
    )
  }
}

module.exports = root
