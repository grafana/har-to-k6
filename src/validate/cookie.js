const iso8601 = require('iso8601-validator')
const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')

/*
 * name: required unique string
 * value: optional string
 * path: optional string
 * domain: optional string
 * expires: optional string, ISO 8601 format
 * httpOnly: optional boolean
 * secure: optional boolean
 * comment: optional string
 */
function cookie(node, i, j, assay) {
  validate(node, i, j, assay)
  name(node.name, i, assay)
}

// eslint-disable-next-line no-unused-vars
function validate(node, i, j, assay) {
  if (empty(node.name)) {
    throw new InvalidArchiveError({ name: 'MissingCookieName' }, `Missing cookie name (${i}:${j})`)
  }
  if (typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidCookieName' },
      `Invalid cookie name (${i}:${j}): must be string`
    )
  }
  if (node.value && typeof node.value !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidCookieValue' },
      `Invalid cookie value (${i}:${j}): must be string`
    )
  }
  if (node.path && typeof node.path !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidCookiePath' },
      `Invalid cookie path (${i}:${j}): must be string`
    )
  }
  if (node.domain && typeof node.domain !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidCookieDomain' },
      `Invalid cookie domain (${i}:${j}): must be string`
    )
  }
  if (node.expires) {
    if (typeof node.expires !== 'string') {
      throw new InvalidArchiveError(
        { name: 'InvalidCookieExpiration' },
        `Invalid cookie expiration (${i}:${j}): must be string`
      )
    }

    if (!iso8601.test(node.expires)) {
      throw new InvalidArchiveError(
        { name: 'InvalidCookieExpiration' },
        `Invalid cookie expiration (${i}:${j}): must be ISO 8601 datetime`
      )
    }
  }
  if (!(empty(node.httpOnly) || typeof node.httpOnly === 'boolean')) {
    throw new InvalidArchiveError(
      { name: 'InvalidCookieHttpOnly' },
      `Invalid cookie HTTP only flag (${i}:${j}): must be boolean`
    )
  }
  if (!(empty(node.secure) || typeof node.secure === 'boolean')) {
    throw new InvalidArchiveError(
      { name: 'InvalidCookieSecure' },
      `Invalid cookie secure flag (${i}:${j}): must be boolean`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidComment' },
      `Invalid cookie comment (${i}:${j}): must be string`
    )
  }
}

function name(value, i, assay) {
  if (!assay.requestCookieNames.has(i)) {
    assay.requestCookieNames.set(i, new Set())
  }
  assay.requestCookieNames.get(i).add(value)
}

module.exports = cookie
