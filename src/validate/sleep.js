const isNaturalNumber = require('is-natural-number')
const { isObject } = require('../aid')
const { InvalidArchiveError } = require('../error')

/*
 * value: Float|Options
 * Options:
 *   before: Float
 *   after: Float
 */
function sleep(node, i, assay) {
  validate(node, i, assay)
}

function validate(node, i, assay) {
  // if (isObject(node)) {
  //   if (node.hasOwnProperty('before') && !isNaturalNumber(node.before, { includeZero: true })) {
  //     throw new InvalidArchiveError(
  //       { name: 'InvalidSleepType' },
  //       `Invalid sleep type (${i}): must be nonnegative number`
  //     )
  //   }
  //   if (node.hasOwnProperty('after') && !isNaturalNumber(node.after, { includeZero: true })) {
  //     throw new InvalidArchiveError(
  //       { name: 'InvalidSleepType' },
  //       `Invalid sleep type (${i}): must be nonnegative number`
  //     )
  //   }
  // } else if (!isNaturalNumber(node, { includeZero: true })) {
  //   throw new InvalidArchiveError(
  //     { name: 'InvalidSleepType' },
  //     `Invalid sleep type (${i}): must be nonnegative number`
  //   )
  // }
}

module.exports = sleep
