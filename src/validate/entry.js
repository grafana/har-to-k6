const checks = require('./checks')
const isPlainObject = require('is-plain-object')
const request = require('./request')
const variables = require('./variables')
const sleep = require('./sleep')
const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')

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
      { name: 'InvalidEntryPageref' },
      `Invalid entry pageref (${i})`
    )
  }
  if (empty(node.request)) {
    throw new InvalidArchiveError(
      { name: 'MissingEntryRequest' },
      `Missing entry request (${i})`
    )
  }
  if (!isPlainObject(node.request)) {
    throw new InvalidArchiveError(
      { name: 'InvalidEntryRequest' },
      `Invalid entry request (${i}): must be object`
    )
  }
  if (node.sleep && !Array.isArray(node.sleep)) {
    throw new InvalidArchiveError(
      { name: 'InvalidEntrySleep' },
      `Invalid entry sleep (${i}): must be array`
    )
  }
  if (node.checks && !Array.isArray(node.checks)) {
    throw new InvalidArchiveError(
      { name: 'InvalidEntryChecks' },
      `Invalid entry checks (${i}): must be array`
    )
  }
  if (node.variables && !Array.isArray(node.variables)) {
    throw new InvalidArchiveError(
      { name: 'InvalidEntryVariables' },
      `Invalid entry variables (${i}): must be array`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidComment' },
      `Invalid entry comment (${i}): must be string`
    )
  }
}

module.exports = entry
