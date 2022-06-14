const { empty, isNil } = require('../../aid')
const { InvalidArchiveError } = require('../../error')
const createErrorParamsForCheckVariants = require('./utils')

/*
 * subject: required
 * expression: required, regular expression
 * condition: prohibited
 * value: prohibited
 */
function Regex(node, i, j) {
  validate(node, i, j)
}

function validate(node, i, j) {
  if (empty(node.subject)) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'MissingCheckSubject',
        indexes: [i, j],
        path: 'subject',
      }),
      `Check subject is required for Regex`
    )
  }
  if (empty(node.expression)) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'MissingCheckExpression',
        indexes: [i, j],
        path: 'expression',
      }),
      `Check expression is required for Regex`
    )
  }
  try {
    new RegExp(node.expression, node.flags) /* eslint-disable-line no-new */
  } catch (error) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'InvalidCheckExpression',
        indexes: [i, j],
        path: 'expression',
      }),
      `Check expression is not a valid regular expression`
    )
  }
  if (!empty(node.condition)) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'InvalidCheckCondition',
        indexes: [i, j],
        path: 'condition',
      }),
      `Check condition is prohibited for Regex`
    )
  }
  if (!isNil(node.value)) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'InvalidCheckValue',
        indexes: [i, j],
        path: 'value',
      }),
      `Check value is prohibited for Regex`
    )
  }
}

module.exports = Regex
