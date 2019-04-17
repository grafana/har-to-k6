const comment = require('../comment')

function header (spec) {
  const text = [
    spec.comment,
    spec.request.comment
  ].filter(item => item).join(`\n`)
  if (text) {
    return comment(text)
  } else {
    return null
  }
}

module.exports = header
