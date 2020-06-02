const entry = require('./entry')

function entries(items) {
  const expanded = !!items.find((item) => item.state.expanded)
  const separator = expanded ? `\n\n` : `\n`
  if (items.length) {
    const sections = items.map((item) => entry(item))
    return sections.filter((item) => item).join(separator)
  } else {
    return null
  }
}

module.exports = entries
