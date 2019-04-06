const isNaturalNumber = require('is-natural-number')
const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')

/*
 * id: required unique string
 * title: required string
 * index: required unique nonnegative integer
 */
function page (node, i, assay) {
  validate(node, i, assay)
  assay.pageIds.add(node.id)
  assay.pageIndices.add(node.index)
}

function validate (node, i, assay) {
  if (empty(node.id)) {
    throw new InvalidArchiveError(
      { name: 'MissingPageId' },
      `Missing page identifier (${i})`
    )
  }
  if (typeof node.id !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidPageId' },
      `Invalid page identifier (${i}): must be string`
    )
  }
  if (assay.pageIds.has(node.id)) {
    throw new InvalidArchiveError(
      { name: 'DuplicatePageId' },
      `Duplicate page identifier (${i}): ${node.id}`
    )
  }
  if (empty(node.title)) {
    throw new InvalidArchiveError(
      { name: 'MissingPageTitle' },
      `Missing page title (${i})`
    )
  }
  if (typeof node.title !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidPageTitle' },
      `Invalid page title (${i}): must be string`
    )
  }
  if (empty(node.index)) {
    throw new InvalidArchiveError(
      { name: 'MissingPageIndex' },
      `Missing page index (${i})`
    )
  }
  if (!isNaturalNumber(node.index, { includeZero: true })) {
    throw new InvalidArchiveError(
      { name: 'InvalidPageIndex' },
      `Invalid page index (${i}): must be natural number`
    )
  }
  if (assay.pageIndices.has(node.index)) {
    throw new InvalidArchiveError(
      { name: 'DuplicatePageIndex' },
      `Duplicate page index (${i}): ${node.index}`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidComment' },
      `Invalid page.comment (${i}): must be string`
    )
  }
}

module.exports = page
