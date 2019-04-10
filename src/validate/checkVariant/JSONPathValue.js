const { empty } = require('../../aid')
const { CheckSubject } = require('../../enum')
const { InvalidArchiveError } = require('../../error')

/*
 * expression: required
 * condition: required
 * value: required
 * subject: prohibited
 */
function JSONPathValue (node, i, j, assay) {
  validate(node, i, j)
}

function validate (node, i, j) {
  if (empty(node.expression)) {
    throw new InvalidArchiveError(
      { name: 'MissingCheckExpression' },
      `Missing check expression (${i}:${j}): required for JSONPathValue`
    )
  }
  if (empty(node.condition)) {
    throw new InvalidArchiveError(
      { name: 'MissingCheckCondition' },
      `Missing check condition (${i}:${j}): required for JSONPathValue`
    )
  }
  if (empty(node.value)) {
    throw new InvalidArchiveError(
      { name: 'MissingCheckValue' },
      `Missing check value (${i}:${j}): required for JSONPathValue`
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
