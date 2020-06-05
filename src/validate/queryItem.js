const { InvalidArchiveError } = require('../error')

/*
 * name: required string
 * value: optional string
 * comment: optional string
 */
function queryItem(node, i, j) {
  validate(node, i, j)
}

function validate(node, i, j) {
  if (typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidQueryItemName' },
      `Invalid query item name (${i}:${j}): must be string`
    )
  }
  if (node.value && typeof node.value !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidQueryItemValue' },
      `Invalid query item value (${i}:${j}): must be string`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidComment' },
      `Invalid query item comment (${i}:${j}): must be string`
    )
  }
}

module.exports = queryItem
