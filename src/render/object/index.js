const indent = require('../indent')
const items = require('./items')

function object(specs) {
  const content = items(specs)
  if (content) {
    return (
      '' +
      `{
${indent(content)}
}`
    )
  } else {
    return `{}`
  }
}

module.exports = object
