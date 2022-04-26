const checks = require('./checks')
const isPlainObject = require('is-plain-object')
const request = require('./request')
const variables = require('./variables')
const sleep = require('./sleep')
const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')
const { createEntriesPath } = require('./utils/path')
const { createEntriesIndexes } = require('./utils/indexes')

/*
 * request: required object
 * pageref: optional string
 * checks: optional array
 * variables: optional array
 * comment: optional string
 */
function entry(node, i, assay) {
  validate(node, i)
  request(node.request, i, assay)
  if (node.checks) {
    checks(node.checks, i, assay)
  }
  if (node.variables) {
    variables(node.variables, i, assay)
  }
  if (node.sleep) {
    sleep(node.sleep, i, assay)
  }
}

function validate(node, i) {
  if (!empty(node.pageref) && typeof node.pageref !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidEntryPageref',
        index: i,
        path: 'pageref',
      }),
      `Entry pageref must be a string`
    )
  }
  if (empty(node.request)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'MissingEntryRequest',
        index: i,
        path: 'request',
      }),
      `Entry request is required`
    )
  }
  if (!isPlainObject(node.request)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidEntryRequest',
        index: i,
        path: 'request',
      }),
      `Entry request must be a plain object`
    )
  }
  if (node.sleep && !Array.isArray(node.sleep)) {
    throw new InvalidArchiveError(
      createErrorParams({ name: 'InvalidEntrySleep', index: i, path: 'sleep' }),
      `Entry sleep must be an array`
    )
  }
  if (node.checks && !Array.isArray(node.checks)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidEntryChecks',
        index: i,
        path: 'checks',
      }),
      `Entry checks are invalid, must be an array`
    )
  }
  if (node.variables && !Array.isArray(node.variables)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidEntryVariables',
        index: i,
        path: 'variables',
      }),
      `Entry variables are invalid, must be an array`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidEntryComment',
        index: i,
        path: 'comment',
      }),
      `Entry comment must be a string`
    )
  }
}

function createErrorParams({ name, index, path = '' }) {
  return {
    name,
    path: createEntriesPath(index, path),
    indexes: createEntriesIndexes(index),
  }
}

module.exports = entry
