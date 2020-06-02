const { empty } = require('../../aid')
const { InvalidArchiveError } = require('../../error')

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
      { name: 'MissingCheckSubject' },
      `Missing check subject (${i}:${j}): required for Text`
    )
  }
  if (empty(node.condition)) {
    throw new InvalidArchiveError(
      { name: 'MissingCheckCondition' },
      `Missing check condition (${i}:${j}): required for Text`
    )
  }
  if (empty(node.value)) {
    throw new InvalidArchiveError(
      { name: 'MissingCheckValue' },
      `Missing check value (${i}:${j}): required for Text`
    )
  }
  if (!empty(node.expression)) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckExpression' },
      `Invalid check expression (${i}:${j}): prohibited for Text`
    )
  }
  if (!empty(node.flags)) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckFlags' },
      `Invalid check flags (${i}:${j}): prohibited for Text`
    )
  }
}

module.exports = Text
