const { lineBreak } = require('../../../expression')

function unlabeled(items) {
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
    return items.map((item) => item.comment).join('\n')
  } else {
    return null
  }
}

function multiline(items) {
  if (items.length) {
    return items.map((item) => item.comment).join('\n')
  } else {
    return null
  }
}

module.exports = unlabeled
