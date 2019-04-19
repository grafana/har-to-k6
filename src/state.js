/*
 * Address is constructible at convert time
 *
 * Address without variable
 * Query without variable
 */
function constructedAddress (spec) {
  const state = spec.state
  return (
    spec.query.size &&
    !(
      state.address.variable ||
      state.query.variable
    )
  )
}

/*
 * Address is a fixed string
 *
 * Address without variable
 * No query
 */
function fixedAddress (spec) {
  const state = spec.state
  return !(
    state.address.variable ||
    spec.query.size
  )
}

/*
 * Address needs simple variable resolution
 * (runtime resolution, no runtime manipulation)
 *
 * Address with inner variable
 * No query
 */
function resolvedAddress (spec) {
  const state = spec.state
  return (
    state.address.variable &&
    !(
      state.address.variableStart ||
      spec.query.size
    )
  )
}

/*
 * Address needs runtime manipulation
 *
 * Any of:
 * - Address with variable at start
 * - Address with variable + query
 * - Query with variable
 */
function runtimeAddress (spec) {
  return !(
    fixedAddress() ||
    constructedAddress() ||
    resolvedAddress()
  )
}

Object.assign(exports, {
  constructedAddress,
  fixedAddress,
  resolvedAddress,
  runtimeAddress
})
