const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')
const { createHeadersIndexes } = require('./utils/indexes')
const { createHeadersPath } = require('./utils/path')

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
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'MissingHeaderName',
        indexes: [i, j],
        path: 'name',
      }),
      `Header name is required`
    )
  }
  if (typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidHeaderName',
        indexes: [i, j],
        path: 'name',
      }),
      `Header name must be a string`
    )
  }
  if (node.value && typeof node.value !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidHeaderValue',
        indexes: [i, j],
        path: 'value',
      }),
      `Header value must be a string`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidHeaderComment',
        indexes: [i, j],
        path: 'comment',
      }),
      `Header comment must be a string`
    )
  }
}

function createErrorParams({
  name,
  indexes: [entryIndex, headerIndex],
  path = '',
}) {
  return {
    name,
    path: createHeadersPath(entryIndex, headerIndex, path),
    indexes: createHeadersIndexes(entryIndex, headerIndex),
  }
}

module.exports = header
