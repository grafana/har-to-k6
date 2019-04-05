const isNaturalNumber = require('is-natural-number')
const { InvalidArchiveError } = require('../error')

function page (node, i, result) {
  validate(node, i, result)
  const spec = {
    name: node.title,
    index: node.index,
    entries: []
  }
  comment(node, spec)
  result.pages.set(node.id, spec)
}

function validate (node, i, result) {
  if (!(node.id && typeof node.id === 'string')) {
    throw new InvalidArchiveError(
      { name: 'MissingPageId' },
      `Missing page identifier (${i})`
    )
  }
  if (result.pages.has(node.id)) {
    throw new InvalidArchiveError(
      { name: 'DuplicatePageId' },
      `Duplicate page identifier (${i}): ${node.id}`
    )
  }
  if (!(node.title && typeof node.title === 'string')) {
    throw new InvalidArchiveError(
      { name: 'MissingPageTitle' },
      `Missing page title (${i})`
    )
  }
  if (!isNaturalNumber(node.index, { includeZero: true })) {
    throw new InvalidArchiveError(
      { name: 'MissingPageIndex' },
      `Missing page index (${i})`
    )
  }
}

function comment (node, spec) {
  if (node.comment) {
    spec.comment = node.comment
  }
}

module.exports = page
