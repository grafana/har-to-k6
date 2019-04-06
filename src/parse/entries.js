const isPlainObject = require('is-plain-object')
const entry = require('./entry')
const { InvalidArchiveError } = require('../error')

function entries (node, result) {
  validate(node)
  for (let i = 0; i < node.length; i++) {
    const item = node[i]
    entry(item, i, result)
  }
}

function validate (node) {
  for (let i = 0; i < node.length; i++) {
    const item = node[i]
    if (!isPlainObject(item)) {
      throw new InvalidArchiveError(
        { name: 'InvalidEntry' },
        `Invalid entry (${i}): must be object`
      )
    }
  }
}

module.exports = entries
