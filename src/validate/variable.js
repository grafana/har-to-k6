const isNaturalNumber = require('is-natural-number')
const { empty } = require('../aid')
const { VariableTypeEncoding, VariableType } = require('../enum')
const { InvalidArchiveError } = require('../error')

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
      { name: 'MissingVariableName' },
      `Missing variable name (${i}:${j})`
    )
  }
  if (typeof node.name !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidVariableName' },
      `Invalid variable name (${i}:${j}): must be string`
    )
  }
  if (/}/.test(node.name)) {
    throw new InvalidArchiveError(
      { name: 'InvalidVariableName' },
      `Invalid variable name (${i}:${j}): may not contain '}'`
    )
  }
  if (empty(node.type)) {
    throw new InvalidArchiveError(
      { name: 'MissingVariableType' },
      `Missing variable type (${i}:${j})`
    )
  }
  if (!isNaturalNumber(node.type, { includeZero: true })) {
    throw new InvalidArchiveError(
      { name: 'InvalidVariableType' },
      `Invalid variable type (${i}:${j}): must be nonnegative integer`
    )
  }
  if (!VariableTypeEncoding.has(node.type)) {
    throw new InvalidArchiveError(
      { name: 'InvalidVariableType' },
      `Invalid variable type (${i}:${j}): ${node.type}`
    )
  }
  if (empty(node.expression)) {
    throw new InvalidArchiveError(
      { name: 'MissingVariableExpression' },
      `Missing variable expression (${i}:${j})`
    )
  }
  if (typeof node.expression !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidVariableExpression' },
      `Invalid variable expression (${i}:${j}): must be string`
    )
  }
  if (node.type === VariableType.CSSSelector && !isValidAttributeName(node)) {
    throw new InvalidArchiveError(
      { name: 'InvalidAttributeName' },
      `Attribute name must be specified (${i}:${j})`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidComment' },
      `Invalid variable comment (${i}:${j}): must be string`
    )
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
