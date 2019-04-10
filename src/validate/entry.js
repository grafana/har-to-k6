const checks = require('./checks')
const isNaturalNumber = require('is-natural-number')
const isPlainObject = require('is-plain-object')
const request = require('./request')
const variables = require('./variables')
const { empty } = require('../aid')
const { ExternalScope } = require('../sym')
const { InvalidArchiveError } = require('../error')

/*
 * index: required nonnegative integer, scopewide unique
 * request: required object
 * pageref: optional string
 * checks: optional array
 * variables: optional array
 * comment: optional string
 */
function entry (node, i, assay) {
  validate(node, i, assay)
  index(node, assay)
  request(node.request, i, assay)
  if (node.checks) {
    checks(node.checks, i, assay)
  }
  if (node.variables) {
    variables(node.variables, i, assay)
  }
}

function validate (node, i, assay) {
  if (!empty(node.pageref) && typeof node.pageref !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidEntryPageref' },
      `Invalid entry pageref (${i})`
    )
  }
  if (empty(node.index)) {
    throw new InvalidArchiveError(
      { name: 'MissingEntryIndex' },
      `Missing entry index (${i})`
    )
  }
  if (!isNaturalNumber(node.index, { includeZero: true })) {
    throw new InvalidArchiveError(
      { name: 'InvalidEntryIndex' },
      `Invalid entry index (${i}): must be nonnegative integer`
    )
  }
  const scope = assay.scopeIndices.get(scopeKey(node))
  if (scope && scope.has(node.index)) {
    throw new InvalidArchiveError(
      { name: 'DuplicateEntryIndex' },
      `Duplicate entry index (${i}): ${node.index}`
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

function scopeKey (node) {
  return (node.pageref || ExternalScope)
}

function index (node, assay) {
  const key = scopeKey(node)
  if (!assay.scopeIndices.has(key)) {
    assay.scopeIndices.set(key, new Set())
  }
  assay.scopeIndices.get(key).add(node.index)
}

module.exports = entry
