const fixed = require('./fixed')
const resolved = require('./resolved')

function plural(spec) {
  if (spec.state.params.variable) {
    return resolved(spec.post.params)
  } else {
    return fixed(spec.post.params)
  }
}

module.exports = plural
