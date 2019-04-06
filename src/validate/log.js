const browser = require('./browser')
const creator = require('./creator')
const entries = require('./entries')
const isPlainObject = require('is-plain-object')
const pages = require('./pages')
const { InvalidArchiveError } = require('../error')

function log (node) {
  validate(node)
  if (node.creator) {
    creator(node.creator)
  }
  if (node.browser) {
    browser(node.browser)
  }
  if (node.pages) {
    pages(node.pages)
  }
  if (node.entries) {
    entries(node.entries)
  }
}

function validate (node) {
  if (node.version && typeof node.version !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidVersion' },
      'Invalid version: must be string'
    )
  }
  if (node.creator && !isPlainObject(node.creator)) {
    throw new InvalidArchiveError(
      { name: 'InvalidCreator' },
      'Invalid creator section: must be object'
    )
  }
  if (node.browser && !isPlainObject(node.browser)) {
    throw new InvalidArchiveError(
      { name: 'InvalidBrowser' },
      'Invalid browser section: must be object'
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidComment' },
      'Invalid log.comment: must be string'
    )
  }
  if (node.pages && !Array.isArray(node.pages)) {
    throw new InvalidArchiveError(
      { name: 'InvalidPages' },
      'Invalid pages section: must be array'
    )
  }
  if (node.entries && !Array.isArray(node.entries)) {
    throw new InvalidArchiveError(
      { name: 'InvalidEntries' },
      'Invalid entries section: must be array'
    )
  }
}

module.exports = log
