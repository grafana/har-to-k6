const { lineBreak } = require('../../../expression')

function query(spec) {
  const state = spec.state
  if (!state.address.variable && spec.query.size && !state.query.variable) {
    // Query string constructed at convert time
    // Comments shifted to header
    const notes = [...spec.query].map(group).filter((item) => item)
    if (notes.length) {
      return (
        '' +
        `Query string notes:
${notes.join('\n')}`
      )
    } else {
      return null
    }
  } else {
    return null
  }
}

function group([name, items]) {
  const plural = items.size > 1
  const notes = [...items].map((item, i) => value(name, item, plural, i)).filter((item) => item)
  if (notes.length) {
    return notes.join('\n')
  } else {
    return null
  }
}

function value(name, item, plural, i) {
  if (item.comment) {
    if (lineBreak.test(item.comment)) {
      return (
        '' +
        `${label(name, plural, i)}:
${item.comment}`
      )
    } else {
      return `${label(name, plural, i)}: ${item.comment}`
    }
  } else {
    return null
  }
}

function label(name, plural, i) {
  if (plural) {
    return `${name}[${i}]`
  } else {
    return `${name}`
  }
}

module.exports = query
