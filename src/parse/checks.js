const check = require('./check')

function checks(node, spec) {
  for (const item of node) {
    check(item, spec)
  }
}

module.exports = checks
