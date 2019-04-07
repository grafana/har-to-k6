const cookies = require('./cookies')
const headers = require('./headers')
const isPlainObject = require('is-plain-object')
const postData = require('./postData')
const queryString = require('./queryString')
const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')

/*
 * method: required string
 * url: required string, absolute URL or starts with variable
 * queryString: optional array
 * headers: optional array
 * cookies: optional array
 * postData: optional object
 * comment: optional string
 */
function request (node, i, assay) {
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
}

function validate (node, i) {
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
  if (!/^(([^:]+):\/\/|\${[^}]*})/.test(node.url)) {
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

module.exports = request
