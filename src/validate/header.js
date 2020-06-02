const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')

/*
 * name: required string
 * value: optional string
 * comment: optional string
 */
function header(node, i, j) {
  validate(node, i, j)
}

function validate(node, i, j) {
  if (empty(node.name)) {
    throw new InvalidArchiveError({ name: 'MissingHeaderName' }, `Missing header name (${i}:${j})`)
  }
  if (typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidHeaderName' },
      `Invalid header name (${i}:${j}): must be string`
    )
  }
  if (node.value && typeof node.value !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidHeaderValue' },
      `Invalid header value (${i}:${j}): must be string`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidComment' },
      `Invalid header comment (${i}:${j}): must be string`
    )
  }
}

module.exports = header
