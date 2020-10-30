const note = require('../../../note/items')
const object = require('../../../object')
const text = require('../../../text')

// Multivalue URL encoded post data with variable
function resolved(params) {
  const spec = specify(params)
  return `new URLSearchParams(${spec}).toString()`
}

function specify(params) {
  const entries = []
  for (const [name, items] of params) {
    if (items.size === 1) {
      const item = [...items][0]
      entries.push(singular(name, item))
    } else {
      entries.push(plural(name, [...items]))
    }
  }
  return object(entries)
}

function singular(name, item) {
  const entry = { name }
  if (item.value) {
    entry.value = text(item.value)
  }
  if (item.comment) {
    entry.comment = item.comment
  }
  return entry
}

function plural(name, items) {
  const entry = { name }
  const values = items.map((item) => item.value)
  if (values.length) {
    const content = values.map((value) => text(value)).join(', ')
    entry.value = `[ ${content} ]`
  }
  if (items.find((item) => item.comment)) {
    entry.comment = note(items)
  }
  return entry
}

module.exports = resolved
