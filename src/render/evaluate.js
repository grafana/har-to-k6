const string = require('./string')

// Runtime evaluate variable
function evaluate(name) {
  return `vars[${string(name)}]`
}

module.exports = evaluate
