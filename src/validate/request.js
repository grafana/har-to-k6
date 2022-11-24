const cookies = require('./cookies')
const headers = require('./headers')
const isPlainObject = require('is-plain-object')
const postData = require('./postData')
const queryString = require('./queryString')
const { empty, emptyObject, getContentTypeValue } = require('../aid')
const { absoluteUrl, variableStart } = require('../expression')
const { InvalidArchiveError } = require('../error')
const { createRequestPath } = require('./utils/path')
const { createEntriesIndexes } = require('./utils/indexes')

/*
 * method: required string
 * url: required string, absolute URL or starts with variable
 * queryString: optional array
 * headers: optional array
 * cookies: optional array
 * postData: optional object
 * comment: optional string
 *
 * no postData with method GET
 * header Content-Type congruent with postData.mimeType
 */
function request(node, i, assay) {
  validate(node, i)
  if (node.queryString) {
    queryString(node.queryString, i, assay)
  }
  if (node.headers) {
    headers(node.headers, i, assay)
  }
  if (node.cookies) {
    cookies(node.cookies, i, assay)
  }
  if (node.postData) {
    postData(node.postData, i, assay)
  }
  relation(node, i)
}

function validate(node, i) {
  if (empty(node.method)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'MissingRequestMethod',
        index: i,
        path: 'method',
      }),
      `Request method is required`
    )
  }

  if (typeof node.method !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidRequestMethod',
        index: i,
        path: 'method',
      }),
      `Request method must be one of: 'GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE', 'HEAD'`
    )
  }

  if (empty(node.url)) {
    throw new InvalidArchiveError(
      createErrorParams({ name: 'MissingRequestUrl', index: i, path: 'url' }),
      `Request URL is required`
    )
  }

  if (typeof node.url !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({ name: 'InvalidRequestUrl', index: i, path: 'url' }),
      `Request URL must be a string`
    )
  }

  if (!(absoluteUrl.test(node.url) || variableStart.test(node.url))) {
    throw new InvalidArchiveError(
      createErrorParams({ name: 'InvalidRequestUrl', index: i, path: 'url' }),
      `Request URL must be absolute or start with variable`
    )
  }

  if (node.queryString && !Array.isArray(node.queryString)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidRequestQuery',
        index: i,
        path: 'queryString',
      }),
      `Request queryString must be an array`
    )
  }

  if (node.headers && !Array.isArray(node.headers)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidRequestHeaders',
        index: i,
        path: 'headers',
      }),
      `Request headers are invalid, must be an array`
    )
  }

  if (node.cookies && !Array.isArray(node.cookies)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidRequestCookies',
        index: i,
        path: 'cookies',
      }),
      `Request cookies are invalid, must be an array`
    )
  }

  if (node.postData && !isPlainObject(node.postData)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidRequestData',
        index: i,
        path: 'postData',
      }),
      `Request postData must be a plain object`
    )
  }

  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidRequestComment',
        index: i,
        path: 'comment',
      }),
      `Request comment must be a string`
    )
  }
}

function relation(node, i) {
  if (
    node.method.toUpperCase() === 'GET' &&
    node.postData &&
    !emptyObject(node.postData)
  ) {
    console.warn(`[WARN] GET request has postData object (${i})`)
  }
  if (
    node.headers &&
    node.postData &&
    node.headers.findIndex(findContentType) !== -1
  ) {
    const header = node.headers.find(findContentType)
    const headerType = getContentTypeValue(header.value)
    const postType = getContentTypeValue(node.postData.mimeType)
    if (headerType !== postType) {
      console.warn(
        `[WARN] Inconsistent post content type (${i}): ` +
          `'${headerType}' vs '${postType}'`
      )
    }
  }
}

function findContentType(header) {
  return header.name.toLowerCase() === 'content-type'
}

function createErrorParams({ name, index, path = '' }) {
  return {
    name,
    path: createRequestPath(index, path),
    indexes: createEntriesIndexes(index),
  }
}

module.exports = request
