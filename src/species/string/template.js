const expression = /\${[^}]*}/

function template (string) {
  return expression.test(string)
}

module.exports = template
