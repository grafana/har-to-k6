const cookies = require('./cookies')
const headers = require('./headers')
const isPlainObject = require('is-plain-object')
const postData = require('./postData')
const queryString = require('./queryString')
const { empty, emptyObject, getContentTypeValue } = require('../aid')
const { absoluteUrl, variableStart } = require('../expression')
const { InvalidArchiveError } = require('../error')

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
      { name: 'MissingRequestMethod' },
      `Missing request method (${i})`
    )
  }
  if (typeof node.method !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidRequestMethod' },
      `Invalid request method (${i}): must be string`
    )
  }
  if (empty(node.url)) {
    throw new InvalidArchiveError(
      { name: 'MissingRequestUrl' },
      `Missing request url (${i})`
    )
  }
  if (typeof node.url !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidRequestUrl' },
      `Invalid request url (${i}): must be string`
    )
  }
  if (!(absoluteUrl.test(node.url) || variableStart.test(node.url))) {
    throw new InvalidArchiveError(
      { name: 'InvalidRequestUrl' },
      `Invalid request url (${i}): must be absolute or start with variable`
    )
  }
  if (node.queryString && !Array.isArray(node.queryString)) {
    throw new InvalidArchiveError(
      { name: 'InvalidRequestQuery' },
      `Invalid request queryString (${i}): must be array`
    )
  }
  if (node.headers && !Array.isArray(node.headers)) {
    throw new InvalidArchiveError(
      { name: 'InvalidRequestHeaders' },
      `Invalid request headers (${i}): must be array`
    )
  }
  if (node.cookies && !Array.isArray(node.cookies)) {
    throw new InvalidArchiveError(
      { name: 'InvalidRequestCookies' },
      `Invalid request cookies (${i}): must be array`
    )
  }
  if (node.postData && !isPlainObject(node.postData)) {
    throw new InvalidArchiveError(
      { name: 'InvalidRequestData' },
      `Invalid request postData (${i}): must be object`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidComment' },
      `Invalid request comment (${i}): must be string`
    )
  }
}

function relation(node, i) {
  if (
    node.method.toUpperCase() === 'GET' &&
    node.postData &&
    !emptyObject(node.postData)
  ) {
    throw new InvalidArchiveError(
      { name: 'InvalidRequestData' },
      `Invalid request postData (${i}): prohibited for GET request`
    )
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

module.exports = request
