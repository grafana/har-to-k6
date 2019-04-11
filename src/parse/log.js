const browser = require('./browser')
const creator = require('./creator')
const entries = require('./entries')
const pages = require('./pages')

function log (node, result) {
  version(node, result)
  if (node.creator) {
    creator(node.creator, result)
  }
  if (node.browser) {
    browser(node.browser, result)
  }
  if (node.comment) {
    comment(node.comment, result)
  }
  if (node.pages) {
    pages(node.pages, result)
  }
  if (node.entries) {
    entries(node.entries, result)
  }
}

function version (node, result) {
  const value = node.version || '1.1'
  result.comment.push(`Converted from HAR v${value} archive`)
}

function comment (value, result) {
  result.comment.push(value)
}

module.exports = log
