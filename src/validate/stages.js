const isPlainObject = require('is-plain-object')
const stage = require('./stage')
const { InvalidArchiveError } = require('../error')

/*
 * [i]: object
 */
function stages (node, assay) {
  validate(node)
  node.forEach((item, i) => stage(item, i, assay))
}

function validate (node) {
  node.forEach((item, i) => {
    if (!isPlainObject(item)) {
      throw new InvalidArchiveError(
        { name: 'InvalidStage' },
        `Invalid stage (${i}): must be object`
      )
    }
  })
}

module.exports = stages
