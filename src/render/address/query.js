const text = require('../text')
const { isNil } = require('../../aid')

// Runtime query string construction
function query(spec, factor) {
  if (spec.size) {
    factor.pre.push(
      [...spec.entries()]
        // [[foo, [1,2]]] => [[foo, 1], [foo, 2]]
        .flatMap(([name, items]) => [...items].map((item) => entry(name, item)))
        .join('\n')
    )
  }
}

function entry(name, { value }) {
  const args = [text(name), text(isNil(value) ? '' : value)]
  return `address.searchParams.append(${args.join(`, `)})`
}

module.exports = query
