const check = require('./check')
const isPlainObject = require('is-plain-object')
const { InvalidArchiveError } = require('../error')

/*
 * [j]: object
 */
function checks(node, i, assay) {
  validate(node, i)
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    check(item, i, j, assay)
  }
}

function validate(node, i) {
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    if (!isPlainObject(item)) {
      throw new InvalidArchiveError(
        { name: 'InvalidCheck' },
        `Invalid check (${i}:${j}): must be object`
      )
    }
  }
}

module.exports = checks
