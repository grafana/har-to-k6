const jsonpath = require('jsonpath')
const { empty, isNil } = require('../../aid')
const { CheckSubject } = require('../../enum')
const { InvalidArchiveError } = require('../../error')
const createErrorParamsForCheckVariants = require('./utils')

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
      createErrorParamsForCheckVariants({
        name: 'MissingCheckExpression',
        indexes: [i, j],
        path: 'expression',
      }),
      `Check expression is required for JSONPathValue`
    )
  }
  try {
    jsonpath.parse(node.expression)
  } catch (error) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'InvalidCheckExpression',
        indexes: [i, j],
        path: 'expression',
      }),
      `Check expression is not a valid JSONPath`
    )
  }
  if (empty(node.condition)) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'MissingCheckCondition',
        indexes: [i, j],
        path: 'condition',
      }),
      `Check condition is required for JSONPathValue`
    )
  }
  if (isNil(node.value)) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'MissingCheckValue',
        indexes: [i, j],
        path: 'value',
      }),
      `Check value is required for JSONPathValue`
    )
  }
  if (!empty(node.flags)) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'InvalidCheckFlags',
        indexes: [i, j],
        path: 'flags',
      }),
      `Check flags is prohibited for JSONPathValue`
    )
  }
  if (!(empty(node.subject) || node.subject === CheckSubject.ResponseBody)) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'InvalidCheckSubject',
        indexes: [i, j],
        path: 'subject',
      }),
      `Check subject is prohibited for JSONPathValue`
    )
  }
}

module.exports = JSONPathValue
