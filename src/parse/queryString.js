const queryItem = require('./queryItem')

function queryString (node, spec, state) {
  for (const item of node) {
    queryItem(item, spec, state)
  }
}

module.exports = queryString
