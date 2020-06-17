const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')
const sleep = require('./sleep')

/*
 * id: required unique string
 * title: required string
 */
function page(node, i, assay) {
  validate(node, i, assay)

  if (node.sleep) {
    sleep(node.sleep, i, assay)
  }

  assay.pageIds.add(node.id)
}

function validate(node, i, assay) {
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
  if (!empty(node.title) && typeof node.title !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidPageTitle' },
      `Invalid page title (${i}): must be string`
    )
  }
  if (node.sleep && !Array.isArray(node.sleep)) {
    throw new InvalidArchiveError(
      { name: 'InvalidPageSleep' },
      `Invalid page sleep (${i}): must be array`
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
