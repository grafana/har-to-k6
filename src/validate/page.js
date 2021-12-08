const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')
const sleep = require('./sleep')
const { createPagesIndexes } = require('./utils/indexes')
const { createPagesPath } = require('./utils/path')

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
      createErrorParams({ name: 'MissingPageId', index: i, path: 'id' }),
      `Page id is required`
    )
  }
  if (typeof node.id !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({ name: 'InvalidPageId', index: i, path: 'id' }),
      `Page id must be a string`
    )
  }
  if (assay.pageIds.has(node.id)) {
    throw new InvalidArchiveError(
      createErrorParams({ name: 'DuplicatePageId', index: i, path: 'id' }),
      `Page id must be unique, duplicate: ${node.id}`
    )
  }
  if (!empty(node.title) && typeof node.title !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({ name: 'InvalidPageTitle', index: i, path: 'title' }),
      `Page title must be a string`
    )
  }
  if (!empty(node.name) && typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({ name: 'InvalidPageName', index: i, path: 'name' }),
      `Page name must be a string`
    )
  }
  if (node.sleep && !Array.isArray(node.sleep)) {
    throw new InvalidArchiveError(
      createErrorParams({ name: 'InvalidPageSleep', index: i, path: 'sleep' }),
      `Page sleep must be an array`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidPageComment',
        index: i,
        path: 'comment',
      }),
      `Page comment must be a string`
    )
  }
}

function createErrorParams({ name, index, path = '' }) {
  return {
    name,
    path: createPagesPath(index, path),
    indexes: createPagesIndexes(index),
  }
}

module.exports = page
