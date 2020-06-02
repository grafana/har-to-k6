const cookie = require('./cookie')
const isPlainObject = require('is-plain-object')
const { InvalidArchiveError } = require('../error')

/*
 * [j]: object
 */
function cookies(node, i, assay) {
  validate(node, i)
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    cookie(item, i, j, assay)
  }
}

function validate(node, i) {
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    if (!isPlainObject(item)) {
      throw new InvalidArchiveError(
        { name: 'InvalidCookie' },
        `Invalid cookie (${i}:${j}): must be object`
      )
    }
  }
}

module.exports = cookies
