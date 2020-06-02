const plural = require('./plural')
const singular = require('./singular')

function url(spec) {
  if (spec.state.params.plural) {
    return plural(spec)
  } else {
    return singular(spec.post.params)
  }
}

module.exports = url
