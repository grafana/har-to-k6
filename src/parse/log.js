const browser = require('./browser')
const creator = require('./creator')
const entries = require('./entries')
const pages = require('./pages')

function log (node, result) {
  if (node.creator) {
    creator(node.creator, result)
  }
  if (node.browser) {
    browser(node.browser, result)
  }
  if (node.comment) {
    result.comment.push(node.comment)
  }
  if (node.pages) {
    pages(node.pages, result)
  }
  if (node.entries) {
    entries(node.entries, result)
  }
}

module.exports = log
