const isNaturalNumber = require('is-natural-number')
const stages = require('./stages')
const { InvalidArchiveError } = require('../error')

/*
 * duration: optional string
 * vus: optional integer
 * stages: optional array
 */
function options (node, assay) {
  validate(node)
  if (node.stages) {
    stages(node.stages, assay)
  }
}

function validate (node) {
  if (node.duration && typeof node.duration !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidOptionDuration' },
      'Invalid option duration: must be string'
    )
  }
  if (node.vus && !isNaturalNumber(node.vus, { includeZero: true })) {
    throw new InvalidArchiveError(
      { name: 'InvalidOptionVUs' },
      `Invalid option VUs: must be nonnegative integer`
    )
  }
  if (node.stages && !Array.isArray(node.stages)) {
    throw new InvalidArchiveError(
      { name: 'InvalidOptionStages' },
      `Invalid option stages: must be array`
    )
  }
}

module.exports = options
