const chain = require('../chain')
const text = require('../text')
const { nought } = require('../../aid')

// Runtime query string construction
function query (spec, factor) {
  if (spec.size) {
    const links = []
    for (const [ name, items ] of spec) {
      links.push(...group(name, items))
    }
    factor.pre.push('' +
`address
${chain(links)};`)
  }
}

function group (name, items) {
  return [ ...items ].map(item => entry(name, item))
}

function entry (name, { value, comment }) {
  const args = []
  args.push(text(name))
  if (!nought(value)) {
    args.push(text(value))
  }
  const call = `addQuery(${args.join(`, `)})`
  return { call, comment }
}

module.exports = query
