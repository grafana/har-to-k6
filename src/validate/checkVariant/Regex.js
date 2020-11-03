const { empty, isNil } = require('../../aid')
const { InvalidArchiveError } = require('../../error')

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
      { name: 'MissingCheckSubject' },
      `Missing check subject (${i}:${j}): required for Regex`
    )
  }
  if (empty(node.expression)) {
    throw new InvalidArchiveError(
      { name: 'MissingCheckExpression' },
      `Missing check expression (${i}:${j}): required for Regex`
    )
  }
  try {
    new RegExp(node.expression, node.flags) /* eslint-disable-line no-new */
  } catch (error) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckExpression', cause: error },
      `Invalid check expression (${i}:${j}): not a valid regular expression`
    )
  }
  if (!empty(node.condition)) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckCondition' },
      `Invalid check condition (${i}:${j}): prohibited for Regex`
    )
  }
  if (!isNil(node.value)) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckValue' },
      `Invalid check value (${i}:${j}): prohibited for Regex`
    )
  }
}

module.exports = Regex
