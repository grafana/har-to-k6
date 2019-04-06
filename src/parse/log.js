const entries = require('./entries')
const pages = require('./pages')

function log (node, result) {
  version(node, result)
  creator(node, result)
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

function creator (node, result) {
  if (node.creator) {
    const creator = node.creator
    const lines = []
    if (creator.name) {
      const name = creator.name
      if (creator.version) {
        lines.push(`Creator: ${name} ${creator.version}`)
      } else {
        lines.push(`Creator: ${name}`)
      }
    }
    if (creator.comment) {
      lines.push(creator.comment)
    }
    if (lines.length) {
      result.comment.push(lines.join(`\n`))
    }
  }
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
