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
    throw new InvalidArchiveError({ name: 'MissingRoot' }, 'Missing root node')
  }
  if (!('log' in node)) {
    throw new InvalidArchiveError({ name: 'MissingLog' }, 'Missing log section')
  }
  if (!isPlainObject(node.log)) {
    throw new InvalidArchiveError({ name: 'InvalidLog' }, 'Invalid log section: must be object')
  }
}

module.exports = root
