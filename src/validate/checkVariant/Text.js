const { empty } = require('../../aid')
const { InvalidArchiveError } = require('../../error')
const createErrorParamsForCheckVariants = require('./utils')

/*
 * subject: required
 * condition: required
 * value: required
 * expression: prohibited
 * flags: prohibited
 */
function Text(node, i, j) {
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
      `Check subject is required for Text`
    )
  }
  if (empty(node.condition)) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'MissingCheckCondition',
        indexes: [i, j],
        path: 'condition',
      }),
      `Check condition is required for Text`
    )
  }
  if (empty(node.value)) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'MissingCheckValue',
        indexes: [i, j],
        path: 'value',
      }),
      `Check value is required for Text`
    )
  }
  if (!empty(node.expression)) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'InvalidCheckExpression',
        indexes: [i, j],
        path: 'expression',
      }),
      `Check expression is prohibited for Text`
    )
  }
  if (!empty(node.flags)) {
    throw new InvalidArchiveError(
      createErrorParamsForCheckVariants({
        name: 'InvalidCheckFlags',
        indexes: [i, j],
        path: 'flags',
      }),
      `Check flags is prohibited for Text`
    )
  }
}

module.exports = Text
