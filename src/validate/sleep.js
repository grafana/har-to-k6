/* eslint-disable no-prototype-builtins */
const isNaturalNumber = require('is-natural-number')
const { isObject } = require('../aid')
const { InvalidArchiveError } = require('../error')
const { createSleepPath } = require('./utils/path')
const { createSleepIndexes } = require('./utils/indexes')

/*
 * value: Float|Options
 * Options:
 *   before: Float
 *   after: Float
 */
function sleep(node, i, assay) {
  node.forEach((item, j) => {
    validate(item, i, j, assay)
  })
}

function validate(node, i, j) {
  if (isObject(node)) {
    if (
      node.hasOwnProperty('before') &&
      !isNaturalNumber(node.before, { includeZero: true })
    ) {
      throw new InvalidArchiveError(
        createErrorParams({
          name: 'InvalidSleepType',
          indexes: [i, j],
          path: 'before',
        }),
        `Sleep before must be a non-negative number`
      )
    }
    if (
      node.hasOwnProperty('after') &&
      !isNaturalNumber(node.after, { includeZero: true })
    ) {
      throw new InvalidArchiveError(
        createErrorParams({
          name: 'InvalidSleepType',
          indexes: [i, j],
          path: 'after',
        }),
        `Sleep after must be a non-negative number`
      )
    }
  } else if (!isNaturalNumber(node, { includeZero: true })) {
    throw new InvalidArchiveError(
      createErrorParams({ name: 'InvalidSleepType', indexes: [i, j] }),
      `Sleep must be a non-negative number`
    )
  }
}

function createErrorParams({
  name,
  indexes: [entryIndex, sleepIndex],
  path = '',
}) {
  return {
    name,
    path: createSleepPath(entryIndex, sleepIndex, path),
    indexes: createSleepIndexes(entryIndex, sleepIndex),
  }
}

module.exports = sleep
