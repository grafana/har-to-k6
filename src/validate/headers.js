const header = require('./header')
const isPlainObject = require('is-plain-object')
const { InvalidArchiveError } = require('../error')

/*
 * [j]: object
 *
 * max 1 Content-Type
 */
function headers(node, i, assay) {
  validate(node, i)
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    header(item, i, j, assay)
  }
  relation(node, i)
}

function validate(node, i) {
  for (let j = 0; j < node.length; j++) {
    const item = node[j]
    if (!isPlainObject(item)) {
      throw new InvalidArchiveError(
        { name: 'InvalidHeader' },
        `Invalid header (${i}:${j}): must be object`
      )
    }
  }
}

function relation(node, i) {
  if (node.reduce(countContentType, 0) > 1) {
    throw new InvalidArchiveError(
      { name: 'MultipleContentType' },
      `Multiple Content-Type headers (${i}): max 1 allowed`
    )
  }
}

function countContentType(count, header) {
  if (header.name && header.name.toLowerCase() === 'content-type') {
    return count + 1
  } else {
    return count
  }
}

module.exports = headers
