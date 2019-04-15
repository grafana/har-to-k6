const entry = require('./entry')

function entries (items) {
  if (items.length) {
    const sections = items.map(item => entry(item))
    return sections.filter(item => item).join(`\n\n`)
  } else {
    return null
  }
}

module.exports = entries
