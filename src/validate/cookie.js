const iso8601 = require('iso8601-validator')
const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')
const { createCookiesIndexes } = require('./utils/indexes')
const { createCookiesPath } = require('./utils/path')

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
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'MissingCookieName',
        indexes: [i, j],
        path: 'name',
      }),
      `Cookie name is required`
    )
  }
  if (typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCookieName',
        indexes: [i, j],
        path: 'name',
      }),
      `Cookie name must be a string`
    )
  }
  if (node.value && typeof node.value !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCookieValue',
        indexes: [i, j],
        path: 'value',
      }),
      `Cookie value must be a string`
    )
  }
  if (node.path && typeof node.path !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCookiePath',
        indexes: [i, j],
        path: 'path',
      }),
      `Cookie path must be a string`
    )
  }
  if (node.domain && typeof node.domain !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCookieDomain',
        indexes: [i, j],
        path: 'domain',
      }),
      `Cookie domain must be a string`
    )
  }
  if (node.expires) {
    if (typeof node.expires !== 'string') {
      throw new InvalidArchiveError(
        createErrorParams({
          name: 'InvalidCookieExpiration',
          indexes: [i, j],
          path: 'expires',
        }),
        `Cookie expiration must be a string`
      )
    }

    if (!iso8601.test(node.expires)) {
      throw new InvalidArchiveError(
        createErrorParams({
          name: 'InvalidCookieExpiration',
          indexes: [i, j],
          path: 'expires',
        }),
        `Cookie expiration must be ISO 8601 datetime`
      )
    }
  }
  if (!(empty(node.httpOnly) || typeof node.httpOnly === 'boolean')) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCookieHttpOnly',
        indexes: [i, j],
        path: 'httpOnly',
      }),
      `Cookie HTTP only flag must be a boolean`
    )
  }
  if (!(empty(node.secure) || typeof node.secure === 'boolean')) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCookieSecure',
        indexes: [i, j],
        path: 'secure',
      }),
      `Cookie secure flag must be a boolean`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCookieComment',
        indexes: [i, j],
        path: 'comment',
      }),
      `Cookie comment must be a string`
    )
  }
}

function name(value, i, assay) {
  if (!assay.requestCookieNames.has(i)) {
    assay.requestCookieNames.set(i, new Set())
  }
  assay.requestCookieNames.get(i).add(value)
}

function createErrorParams({
  name,
  indexes: [entryIndex, headerIndex],
  path = '',
}) {
  return {
    name,
    path: createCookiesPath(entryIndex, headerIndex, path),
    indexes: createCookiesIndexes(entryIndex, headerIndex),
  }
}

module.exports = cookie
