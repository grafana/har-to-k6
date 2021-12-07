const { InvalidArchiveError } = require('../error')
const { createLogPath } = require('./utils/path')

function browser(node) {
  validate(node)
}

function validate(node) {
  if (node.name && typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      {
        name: 'InvalidBrowserName',
        path: createLogPath('browser.name'),
        indexes: [],
      },
      'Browser name is invalid, must be a string'
    )
  }
  if (node.version && typeof node.version !== 'string') {
    throw new InvalidArchiveError(
      {
        name: 'InvalidBrowserVersion',
        path: createLogPath('browser.version'),
        indexes: [],
      },
      'Browser version is invalid, must be a string'
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      {
        name: 'InvalidBrowserComment',
        path: createLogPath('browser.comment'),
        indexes: [],
      },
      'Browser comment is invalid, must be a string'
    )
  }
}

module.exports = browser
