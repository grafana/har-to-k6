const { InvalidArchiveError } = require('../error')

function browser(node) {
  validate(node)
}

function validate(node) {
  if (node.name && typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidBrowserName' },
      'Invalid browser name: must be string'
    )
  }
  if (node.version && typeof node.version !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidBrowserVersion' },
      'Invalid browser version: must be string'
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidComment' },
      'Invalid browser.comment: must be string'
    )
  }
}

module.exports = browser
