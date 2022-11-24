const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')
const { createQueryStringPath } = require('./utils/path')
const { createQueryStringIndexes } = require('./utils/indexes')

/*
 * name: required string
 * value: optional string
 * comment: optional string
 */
function queryItem(node, i, j) {
  validate(node, i, j)
}

function validate(node, i, j) {
  if (empty(node.name)) {
    console.warn(`[WARN] Discarding query item with missing name (${i}:${j})`)

    return
  }

  if (typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidQueryItemName',
        indexes: [i, j],
        path: 'name',
      }),
      `Query item name must be a string`
    )
  }
  if (node.value && typeof node.value !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidQueryItemValue',
        indexes: [i, j],
        path: 'value',
      }),
      `Query item value must be a string`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidQueryStringComment',
        indexes: [i, j],
        path: 'comment',
      }),
      `Query item comment must be a string`
    )
  }
}

function createErrorParams({
  name,
  indexes: [entryIndex, queryStringIndex],
  path = '',
}) {
  return {
    name,
    path: createQueryStringPath(entryIndex, queryStringIndex, path),
    indexes: createQueryStringIndexes(entryIndex, queryStringIndex),
  }
}

module.exports = queryItem
