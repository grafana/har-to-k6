const indent = require('../render/indent')
const string = require('../render/string')

function index (addend) {
  const entries = []
  for (const [ expose, name ] of addend.direct) {
    entries.push(`${expose}: require(${string(name)})`)
  }
  for (const [ expose, name ] of addend.indirect) {
    entries.push(`${expose}: require(${string(name)}).default`)
  }
  const content = entries.join(`,\n`)
  return '' +
`Object.assign(exports, {
${indent(content)}
})`
}

module.exports = index
