const { InvalidArchiveError } = require('../error')
const { createLogPath } = require('./utils/path')

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
      {
        name: 'InvalidCreatorName',
        path: createLogPath('creator.name'),
      },
      'Creator name must be a string'
    )
  }
  if (node.version && typeof node.version !== 'string') {
    throw new InvalidArchiveError(
      {
        name: 'InvalidCreatorVersion',
        path: createLogPath('creator.version'),
      },
      'Creator version must be a string'
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      {
        name: 'InvalidCreatorComment',
        path: createLogPath('creator.comment'),
      },
      'Creator comment must be a string'
    )
  }
}

module.exports = creator
