const expr = require('../../expression')

function params(spec) {
  const state = spec.state.params
  state.plural = plural(spec)
  state.variable = variable(spec)
}

/*
 * Multivalue param
 */
function plural(spec) {
  return !!spec.post.params && !![...spec.post.params.values()].find((items) => items.size > 1)
}

/*
 * Name or value with variable
 */
function variable(spec) {
  return (
    !!spec.post.params &&
    !!(
      [...spec.post.params.keys()].find((name) => expr.variable.test(name)) ||
      [...spec.post.params.values()].find((items) =>
        [...items].find(({ value }) => value && expr.variable.test(value))
      )
    )
  )
}

module.exports = params
