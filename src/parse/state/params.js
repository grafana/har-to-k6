const expr = require('../../expression')

function params (spec) {
  const state = spec.state.params
  state.variable = variable(spec)
}

/*
 * Name or value with variable
 */
function variable (spec) {
  return !!spec.post.params && !!(
    [ ...spec.post.params.keys() ].find(name => expr.variable.test(name)) ||
    [ ...spec.post.params.values() ].find(items => [ ...items ].find(
      ({ value }) => value && expr.variable.test(value)
    ))
  )
}

module.exports = params
