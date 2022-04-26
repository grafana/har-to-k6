const isNaturalNumber = require('is-natural-number')
const { empty } = require('../aid')
const { VariableTypeEncoding, VariableType } = require('../enum')
const { InvalidArchiveError } = require('../error')
const { createVariablesIndexes } = require('./utils/indexes')
const { createVariablesPath } = require('./utils/path')

/*
 * name: required string, no } character
 * type: required VariableType
 * expression: required string
 * comment: optional string
 */

function variable(node, i, j) {
  validate(node, i, j)
}

function validate(node, i, j) {
  if (empty(node.name)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'MissingVariableName',
        indexes: [i, j],
        path: 'name',
      }),
      `Variable name is required`
    )
  }
  if (typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidVariableName',
        indexes: [i, j],
        path: 'name',
      }),
      `Variable name must be a string`
    )
  }
  if (/}/.test(node.name)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidVariableName',
        indexes: [i, j],
        path: 'name',
      }),
      `Variable name may not contain '}'`
    )
  }
  if (empty(node.type)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'MissingVariableType',
        indexes: [i, j],
        path: 'type',
      }),
      `Variable type is required`
    )
  }
  if (!isNaturalNumber(node.type, { includeZero: true })) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidVariableType',
        indexes: [i, j],
        path: 'type',
      }),
      `Variable type must be a non-negative integer`
    )
  }
  if (!VariableTypeEncoding.has(node.type)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidVariableType',
        indexes: [i, j],
        path: 'type',
      }),
      `Variable type must be one of 0 (JSON Path), 1 (Regex), 2 (CSS Selector)`
    )
  }
  if (empty(node.expression)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'MissingVariableExpression',
        indexes: [i, j],
        path: 'expression',
      }),
      `Variable expression is required`
    )
  }
  if (typeof node.expression !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidVariableExpression',
        indexes: [i, j],
        path: 'expression',
      }),
      `Variable expression must be a string`
    )
  }
  if (node.type === VariableType.CSSSelector && !isValidAttributeName(node)) {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidAttributeName',
        indexes: [i, j],
        path: 'name',
      }),
      `Variable attribute name is required`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      createErrorParams({
        name: 'InvalidVariableComment',
        indexes: [i, j],
        path: 'comment',
      }),
      `Variable comment must be a string`
    )
  }
}

function createErrorParams({
  name,
  indexes: [entryIndex, sleepIndex],
  path = '',
}) {
  return {
    name,
    path: createVariablesPath(entryIndex, sleepIndex, path),
    indexes: createVariablesIndexes(entryIndex, sleepIndex),
  }
}

function isValidAttributeName({ attribute }) {
  return (
    attribute === undefined || attribute === null || isNonEmptyString(attribute)
  )
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value !== ''
}

module.exports = variable
