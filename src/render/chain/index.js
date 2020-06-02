const indent = require('../indent')
const items = require('./items')

function chain(specs) {
  const content = items(specs)
  if (content) {
    return indent(content)
  } else {
    return null
  }
}

module.exports = chain
