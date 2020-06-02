const cookie = require('./cookie')

function cookies(node, spec) {
  for (const item of node) {
    cookie(item, spec)
  }
}

module.exports = cookies
