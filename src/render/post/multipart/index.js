const fixed = require('./fixed')
const resolved = require('./resolved/arg')

function multipart (spec) {
  if (spec.state.params.variable) {
    return resolved()
  } else {
    return fixed(spec.post.params)
  }
}

module.exports = multipart
