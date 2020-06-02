const browser = require('./browser')
const creator = require('./creator')
const entries = require('./entries')
const options = require('./options')
const isPlainObject = require('is-plain-object')
const pages = require('./pages')
const { InvalidArchiveError } = require('../error')

/*
 * version: optional string
 * creator: optional object
 * browser: optional object
 * comment: optional string
 * pages: optional array
 * entries: optional array
 */
function log(node, assay) {
  validate(node)
  if (node.options) {
    options(node.options, assay)
  }
  if (node.creator) {
    creator(node.creator, assay)
  }
  if (node.browser) {
    browser(node.browser, assay)
  }
  if (node.pages) {
    pages(node.pages, assay)
  }
  if (node.entries) {
    entries(node.entries, assay)
  }
}

function validate(node) {
  if (node.options && !isPlainObject(node.options)) {
    throw new InvalidArchiveError({ name: 'InvalidOptions' }, 'Invalid options: must be object')
  }
  if (node.version && typeof node.version !== 'string') {
    throw new InvalidArchiveError({ name: 'InvalidVersion' }, 'Invalid version: must be string')
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
    throw new InvalidArchiveError({ name: 'InvalidComment' }, 'Invalid log.comment: must be string')
  }
  if (node.pages && !Array.isArray(node.pages)) {
    throw new InvalidArchiveError({ name: 'InvalidPages' }, 'Invalid pages section: must be array')
  }
  if (node.entries && !Array.isArray(node.entries)) {
    throw new InvalidArchiveError(
      { name: 'InvalidEntries' },
      'Invalid entries section: must be array'
    )
  }
}

module.exports = log
