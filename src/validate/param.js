const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')
const { createPostDataParamsIndexes } = require('./utils/indexes')
const { createPostDataParamsPath } = require('./utils/path')

/*
 * name: required string
 * value: optional string
 * fileName: optional string
 * contentType: optional string
 * comment: optional string
 */
function param(node, i, j) {
  validate(node, i, j)
}

function validate(node, i, j) {
  if (empty(node.name)) {
    console.warn(`[WARN] Discarding param with missing name (${i}:${j})`)

    return
  }

  if (typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidParamName',
        indexes: [i, j],
        path: 'name',
      }),
      `Param name must be a string`
    )
  }

  if (node.value && typeof node.value !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidParamValue',
        indexes: [i, j],
        path: 'value',
      }),
      `Param value must be a string`
    )
  }

  if (node.fileName && typeof node.fileName !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidParamFileName',
        indexes: [i, j],
        path: 'fileName',
      }),
      `Param file name must be a string`
    )
  }

  if (node.contentType && typeof node.contentType !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidParamType',
        indexes: [i, j],
        path: 'contentType',
      }),
      `Param content type must be a string`
    )
  }

  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidParamComment',
        indexes: [i, j],
        path: 'comment',
      }),
      `Param comment must be a string`
    )
  }
}

function createErrorParams({
  name,
  indexes: [entryIndex, checkIndex],
  path = '',
}) {
  return {
    name,
    path: createPostDataParamsPath(entryIndex, checkIndex, path),
    indexes: createPostDataParamsIndexes(entryIndex, checkIndex),
  }
}

module.exports = param
