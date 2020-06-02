const { variable } = require('../../expression')

function template(string) {
  return variable.test(string)
}

module.exports = template
