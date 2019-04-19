const expr = require('../../expression')

// Assumes query state determined
function address (spec) {
  spec.state.address.variable = variable(spec)
  spec.state.address.variableStart = variableStart(spec)
  spec.state.address.fixed = fixed(spec)
  spec.state.address.constructed = constructed(spec)
  spec.state.address.resolved = resolved(spec)
  spec.state.address.runtime = runtime(spec)
}

/* Contains variable */
function variable (spec) {
  return expr.variable.test(spec.address)
}

/* Starts with variable */
function variableStart (spec) {
  return expr.variableStart.test(spec.address)
}

/*
 * Fixed string
 *
 * Address without variable
 * No query
 */
function fixed (spec) {
  return !(
    spec.state.address.variable ||
    !!spec.query.size
  )
}

/*
 * Constructible at convert time
 *
 * Address without variable
 * Query without variable
 */
function constructed (spec) {
  return (
    !!spec.query.size &&
    !(
      spec.state.address.variable ||
      spec.state.query.variable
    )
  )
}

/*
 * Needs simple variable resolution
 * (runtime resolution, no runtime manipulation)
 *
 * Address with inner variable
 * No query
 */
function resolved (spec) {
  return (
    spec.state.address.variable &&
    !(
      spec.state.address.variableStart ||
      !!spec.query.size
    )
  )
}

/*
 * Needs runtime manipulation
 *
 * Any of:
 * - Address with variable at start
 * - Address with variable + query
 * - Query with variable
 */
function runtime (spec) {
  return !(
    spec.state.address.fixed ||
    spec.state.address.constructed ||
    spec.state.address.resolved
  )
}

module.exports = address
