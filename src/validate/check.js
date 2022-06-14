const checkName = require('../string/check/name')
const checkVariant = require('./checkVariant')
const { empty } = require('../aid')
const {
  CheckConditionEncoding,
  CheckSubjectEncoding,
  CheckTypeEncoding,
} = require('../enum')
const { InvalidArchiveError } = require('../error')
const { createChecksPath } = require('./utils/path')
const { createChecksIndexes } = require('./utils/indexes')

/*
 * type: required CheckType
 * subject: optional CheckSubject
 * condition: optional CheckCondition
 * expression: optional string
 * flags: optional string
 * value: optional string
 * comment: optional string
 *
 * effective name unique
 */
function check(node, i, j, assay) {
  validate(node, i, j)
  checkVariant[CheckTypeEncoding.get(node.type)](node, i, j, assay)
  validateName(node, i, j, assay)
  name(node, i, assay)
}

function validate(node, i, j) {
  if (empty(node.type)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'MissingCheckType',
        indexes: [i, j],
        path: 'type',
      }),
      `Check type is required`
    )
  }
  if (!CheckTypeEncoding.has(node.type)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCheckType',
        indexes: [i, j],
        path: 'type',
      }),
      `Check type must be one of: 0 (Text), 1 (JSON path value), 2 (JSON path), 3 (Regex)`
    )
  }
  if (!(empty(node.subject) || CheckSubjectEncoding.has(node.subject))) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCheckSubject',
        indexes: [i, j],
        path: 'subject',
      }),
      `Check subject must be one of: 0 (Response body), 1 (Response headers), 2 (HTTP status code)`
    )
  }
  if (!(empty(node.condition) || CheckConditionEncoding.has(node.condition))) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCheckCondition',
        indexes: [i, j],
        path: 'condition',
      }),
      `Check condition must be one of: 0 (Contains), 1 (Not contains), 2 (Equals), 3 (Starts with), 4 (Ends with), 5 (Type of)`
    )
  }
  if (node.expression && typeof node.expression !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCheckExpression',
        indexes: [i, j],
        path: 'expression',
      }),
      `Check expression must be a string`
    )
  }
  if (node.flags && typeof node.flags !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCheckFlags',
        indexes: [i, j],
        path: 'flags',
      }),
      `Check flags must be a string`
    )
  }
  if (node.value && typeof node.value !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCheckValue',
        indexes: [i, j],
        path: 'value',
      }),
      `Check value must be a string`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidCheckComment',
        indexes: [i, j],
        path: 'comment',
      }),
      `Check comment must be string`
    )
  }
}

function validateName(node, i, j, assay) {
  if (
    assay.requestCheckNames.has(i) &&
    assay.requestCheckNames.get(i).has(checkName(node))
  ) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'DuplicateCheckName',
        indexes: [i, j],
        path: 'name',
      }),
      `Check name must be unique, duplicate: ${checkName(node)}`
    )
  }
}

function name(node, i, assay) {
  if (!assay.requestCheckNames.has(i)) {
    assay.requestCheckNames.set(i, new Set())
  }
  assay.requestCheckNames.get(i).add(checkName(node))
}

function createErrorParams({
  name,
  indexes: [entryIndex, checkIndex],
  path = '',
}) {
  return {
    name,
    path: createChecksPath(entryIndex, checkIndex, path),
    indexes: createChecksIndexes(entryIndex, checkIndex),
  }
}

module.exports = check
