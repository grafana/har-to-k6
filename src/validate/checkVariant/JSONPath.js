const { empty, nought } = require('../../aid')
const { CheckSubject } = require('../../enum')
const { InvalidArchiveError } = require('../../error')

/*
 * expression: required
 * condition: prohibited
 * value: prohibited
 * flags: prohibited
 * subject: prohibited except CheckSubject.ResponseBody
 */
function JSONPath (node, i, j, assay) {
  validate(node, i, j)
}

function validate (node, i, j) {
  if (empty(node.expression)) {
    throw new InvalidArchiveError(
      { name: 'MissingCheckExpression' },
      `Missing check expression (${i}:${j}): required for JSONPath`
    )
  }
  if (!empty(node.condition)) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckCondition' },
      `Invalid check condition (${i}:${j}): prohibited for JSONPath`
    )
  }
  if (!nought(node.value)) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckValue' },
      `Invalid check value (${i}:${j}): prohibited for JSONPath`
    )
  }
  if (!empty(node.flags)) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckFlags' },
      `Invalid check flags (${i}:${j}): prohibited for JSONPath`
    )
  }
  if (!(empty(node.subject) || node.subject === CheckSubject.ResponseBody)) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckSubject' },
      `Invalid check subject (${i}:${j}): prohibited for JSONPath`
    )
  }
}

module.exports = JSONPath
