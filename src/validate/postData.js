const params = require('./params')
const {
  empty,
  emptyObject,
  seralizeURLSearchParams,
  getContentTypeValue,
} = require('../aid')
const { InvalidArchiveError } = require('../error')
const { createPostDataPath } = require('./utils/path')
const { createEntriesIndexes } = require('./utils/indexes')

/*
 * mimeType: required string
 * params: optional array
 * text: optional string
 * comment: optional string
 *
 * max 1 nonempty params|text
 * structured data type application/x-www-form-urlencoded|multipart/form-data
 */
function postData(node, i, assay) {
  if (!emptyObject(node)) {
    validate(node, i)
    if (node.params) {
      params(node.params, i, assay)
    }
  }
}

function validate(node, i) {
  if (empty(node.mimeType)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'MissingPostDataType',
        index: i,
        path: 'mimeType',
      }),
      `Post data MIME type is required`
    )
  }

  if (typeof node.mimeType !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidPostDataType',
        index: i,
        path: 'mimeType',
      }),
      `Post data MIME type must be a string`
    )
  }

  if (node.params && !Array.isArray(node.params)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidPostDataParams',
        index: i,
        path: 'params',
      }),
      `Post data params are invalid, must be an array`
    )
  }

  if (node.text && typeof node.text !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidPostDataText',
        index: i,
        path: 'text',
      }),
      `Post data text must be a string`
    )
  }

  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidPostDataComment',
        index: i,
        path: 'comment',
      }),
      `Post data comment must be a string`
    )
  }

  if (
    node.params &&
    node.params.length &&
    node.text &&
    node.mimeType.includes('application/x-www-form-urlencoded')
  ) {
    if (seralizeURLSearchParams(node.params) !== node.text) {
      console.warn(
        `[WARN] Post data conflict (${i}): Both params and text are provided but the values do not match.`
      )
    }
  }

  if (
    node.params &&
    node.params.length &&
    ![
      'application/x-www-form-urlencoded',
      'multipart/form-data',
      'application/json',
    ].includes(getContentTypeValue(node.mimeType))
  ) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidPostDataType',
        index: i,
        path: 'mimeType',
      }),
      `Post data MIME type must be one of "multipart/form-data", "application/x-www-form-urlencoded"`
    )
  }
}

function createErrorParams({ name, index, path = '' }) {
  return {
    name,
    path: createPostDataPath(index, path),
    indexes: createEntriesIndexes(index),
  }
}

module.exports = postData
