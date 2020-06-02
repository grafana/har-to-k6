const indent = require('../render/indent')
const string = require('../render/string')

function entry({ direct = new Map(), indirect = new Map() }) {
  const entries = []
  for (const [expose, name] of direct) {
    entries.push(`${expose}: require(${string(name)})`)
  }
  for (const [expose, name] of indirect) {
    entries.push(`${expose}: require(${string(name)}).default`)
  }
  const content = entries.join(`,\n`)
  return (
    '' +
    `Object.assign(exports, {
${indent(content)}
})`
  )
}

module.exports = entry
