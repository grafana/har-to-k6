const indent = require('./indent')

function block(sections) {
  if (sections.length) {
    const content = sections.join(`\n\n`)
    return `{
${indent(content)}
}`
  } else {
    return `{}`
  }
}

module.exports = block
