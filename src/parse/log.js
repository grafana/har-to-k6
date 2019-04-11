const creator = require('./creator')
const entries = require('./entries')
const pages = require('./pages')

function log (node, result) {
  version(node, result)
  if (node.creator) {
    creator(node.creator, result)
  }
  browser(node, result)
  comment(node, result)
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

function browser (node, result) {
  if (node.browser) {
    const browser = node.browser
    const lines = []
    if (browser.name) {
      const name = browser.name
      if (browser.version) {
        lines.push(`Browser: ${name} ${browser.version}`)
      } else {
        lines.push(`Browser: ${name}`)
      }
    }
    if (browser.comment) {
      lines.push(browser.comment)
    }
    if (lines.length) {
      result.comment.push(lines.join(`\n`))
    }
  }
}

function comment (node, result) {
  if (node.comment) {
    result.comment.push(node.comment)
  }
}

module.exports = log
