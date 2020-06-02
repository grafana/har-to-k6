const sort = require('../../../sort')
const { lineBreak } = require('../../../expression')

function labeled(items) {
  if (items.length) {
    return [
      line(items.filter((item) => !lineBreak.test(item.comment))),
      multiline(items.filter((item) => lineBreak.test(item.comment))),
    ]
      .filter((item) => item)
      .join('\n')
  } else {
    return null
  }
}

function line(items) {
  if (items.length) {
    items.sort(sort.value)
    return items.map((item) => `${item.value}: ${item.comment}`).join('\n')
  } else {
    return null
  }
}

function multiline(items) {
  if (items.length) {
    items.sort(sort.value)
    return items.map((item) => `${item.value}:\n${item.comment}`).join('\n')
  } else {
    return null
  }
}

module.exports = labeled
