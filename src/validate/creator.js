const { InvalidArchiveError } = require('../error')

/*
 * name: optional string
 * version: optional string
 * comment: optional string
 */
function creator(node) {
  validate(node)
}

function validate(node) {
  if (node.name && typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidCreatorName' },
      'Invalid creator name: must be string'
    )
  }
  if (node.version && typeof node.version !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidCreatorVersion' },
      'Invalid creator version: must be string'
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidComment' },
      'Invalid creator.comment: must be string'
    )
  }
}

module.exports = creator
