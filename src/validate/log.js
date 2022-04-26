const browser = require('./browser')
const creator = require('./creator')
const entries = require('./entries')
const options = require('./options')
const isPlainObject = require('is-plain-object')
const pages = require('./pages')
const { InvalidArchiveError } = require('../error')
const { createLogPath } = require('./utils/path')

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
    throw new InvalidArchiveError(
      { name: 'InvalidOptions', path: createLogPath('options') },
      'Options are invalid, must be a plain object'
    )
  }
  if (node.version && typeof node.version !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidVersion', path: createLogPath('version') },
      'Version must be a string'
    )
  }
  if (node.creator && !isPlainObject(node.creator)) {
    throw new InvalidArchiveError(
      { name: 'InvalidCreator', path: createLogPath('creator') },
      'Creator section must be a plain object'
    )
  }
  if (node.browser && !isPlainObject(node.browser)) {
    throw new InvalidArchiveError(
      { name: 'InvalidBrowser', path: createLogPath('browser') },
      'Browser section must be a plain object'
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidLogComment', path: createLogPath('comment') },
      'Comment must be a string'
    )
  }
  if (node.pages && !Array.isArray(node.pages)) {
    throw new InvalidArchiveError(
      { name: 'InvalidPages', path: createLogPath('pages') },
      'Pages section must be an array'
    )
  }
  if (node.entries && !Array.isArray(node.entries)) {
    throw new InvalidArchiveError(
      { name: 'InvalidEntries', path: createLogPath('entries') },
      'Entries section must be an array'
    )
  }
}

module.exports = log
