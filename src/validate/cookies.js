const cookie = require('./cookie')
const isPlainObject = require('is-plain-object')
const { InvalidArchiveError } = require('../error')
const { createCookiesIndexes } = require('./utils/indexes')
const { createCookiesPath } = require('./utils/path')

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
        {
          name: 'InvalidCookie',
          path: createCookiesPath(i, j),
          indexes: createCookiesIndexes(i, j),
        },
        `Cookie must be a plain object`
      )
    }
  }
}

module.exports = cookies
