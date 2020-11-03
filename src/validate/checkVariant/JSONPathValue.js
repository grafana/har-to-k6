const jsonpath = require('jsonpath')
const { empty, isNil } = require('../../aid')
const { CheckSubject } = require('../../enum')
const { InvalidArchiveError } = require('../../error')

/*
 * expression: required, JSONPath
 * condition: required
 * value: required, empty string allowed
 * flags: prohibited
 * subject: prohibited except CheckSubject.ResponseBody
 */
function JSONPathValue(node, i, j) {
  validate(node, i, j)
}

function validate(node, i, j) {
  if (empty(node.expression)) {
    throw new InvalidArchiveError(
      { name: 'MissingCheckExpression' },
      `Missing check expression (${i}:${j}): required for JSONPathValue`
    )
  }
  try {
    jsonpath.parse(node.expression)
  } catch (error) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckExpression', cause: error },
      `Invalid check expression (${i}:${j}): not a valid JSONPath`
    )
  }
  if (empty(node.condition)) {
    throw new InvalidArchiveError(
      { name: 'MissingCheckCondition' },
      `Missing check condition (${i}:${j}): required for JSONPathValue`
    )
  }
  if (isNil(node.value)) {
    throw new InvalidArchiveError(
      { name: 'MissingCheckValue' },
      `Missing check value (${i}:${j}): required for JSONPathValue`
    )
  }
  if (!empty(node.flags)) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckFlags' },
      `Invalid check flags (${i}:${j}): prohibited for JSONPathValue`
    )
  }
  if (!(empty(node.subject) || node.subject === CheckSubject.ResponseBody)) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckSubject' },
      `Invalid check subject (${i}:${j}): prohibited for JSONPathValue`
    )
  }
}

module.exports = JSONPathValue
