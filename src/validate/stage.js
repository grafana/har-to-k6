const isNaturalNumber = require('is-natural-number')
const { empty } = require('../aid')
const { InvalidArchiveError } = require('../error')

/*
 * duration: required string
 * target: required integer
 */
function stage (node, i) {
  validate(node, i);
}

function validate (node, i) {
  if (empty(node.duration)) {
    throw new InvalidArchiveError(
      { name: 'MissingStageDuration' },
      `Missing stage duration (${i})`
    )
  }
  if (typeof node.duration !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidStageDuration' },
      `Invalid stage duration (${i}): must be string`
    )
  }
  if (empty(node.duration)) {
    throw new InvalidArchiveError(
      { name: 'MissingStageTarget' },
      `Missing stage target (${i})`
    )
  }
  if (!isNaturalNumber(node.target, { includeZero: true })) {
    throw new InvalidArchiveError(
      { name: 'InvalidStageTarget' },
      `Invalid stage target (${i}): must be nonnegative integer`
    )
  }
}

module.exports = stage
