const expr = require('../../expression')

function query(spec) {
  spec.state.query.variable = variable(spec)
}

/*
 * Name or value with variable
 */
function variable(spec) {
  return !!(
    [...spec.query.keys()].find((name) => expr.variable.test(name)) ||
    [...spec.query.values()].find((items) =>
      [...items].find(({ value }) => value && expr.variable.test(value))
    )
  )
}

module.exports = query
