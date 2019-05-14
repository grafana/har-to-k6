const queryItem = require('./queryItem')

function queryString (node, spec) {
  for (const item of node) {
    queryItem(item, spec)
  }
}

module.exports = queryString
