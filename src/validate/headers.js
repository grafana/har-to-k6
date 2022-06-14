const header = require('./header')
const isPlainObject = require('is-plain-object')
const { InvalidArchiveError } = require('../error')
const { createEntriesPath, createHeadersPath } = require('./utils/path')
const {
  createEntriesIndexes,
  createHeadersIndexes,
} = require('./utils/indexes')

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
        {
          name: 'InvalidHeader',
          path: createHeadersPath(i, j),
          indexes: createHeadersIndexes(i, j),
        },
        `Header must be a plain object`
      )
    }
  }
}

function relation(node, i) {
  if (node.reduce(countContentType, 0) > 1) {
    throw new InvalidArchiveError(
      {
        name: 'MultipleContentType',
        path: createEntriesPath(i, 'headers'),
        indexes: createEntriesIndexes(i),
      },
      `Header "Content-Type" is unique, only 1 allowed`
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
