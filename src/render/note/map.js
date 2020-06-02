const itemsNote = require('./items')
const sort = require('../../sort')
const { lineBreak } = require('../../expression')

// Combined note for map of item set
function note(map) {
  const comments = [...map]
    .map(([name, items]) => [name, itemsNote([...items])])
    .filter(([, comment]) => comment)
    .sort(sort.firstElement)
  if (comments.length) {
    if (multiline(comments)) {
      return spread(comments)
    } else {
      return compact(comments)
    }
  } else {
    return null
  }
}

function multiline(comments) {
  return !!comments.find(([, comment]) => lineBreak.test(comment))
}

function compact(comments) {
  return comments.map(([name, comment]) => `-${name}- ${comment}`).join('\n')
}

function spread(comments) {
  return comments.map(([name, comment]) => section(name, comment)).join('\n\n')
}

function section(name, comment) {
  if (lineBreak.test(comment)) {
    return `-${name}-\n${comment}`
  } else {
    return `-${name}- ${comment}`
  }
}

module.exports = note
