const variable = require('./variable')

function variables(node, spec) {
  for (const item of node) {
    variable(item, spec)
  }
}

module.exports = variables
