const labeled = require('./labeled')
const unlabeled = require('./unlabeled')

// Combined note for item set
function note(items) {
  const comments = items.filter((item) => item.comment)
  if (!comments.length) {
    return null
  } else if (items.length === 1) {
    return comments[0].comment
  } else {
    return [
      unlabeled(items.filter((item) => !item.value)),
      labeled(items.filter((item) => item.value)),
    ]
      .filter((item) => item)
      .join('\n')
  }
}

module.exports = note
