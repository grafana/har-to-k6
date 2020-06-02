const comment = require('./comment')

function header(result) {
  if (result.comment.length) {
    return comment(result.comment.join(`\n`))
  } else {
    return null
  }
}

module.exports = header
