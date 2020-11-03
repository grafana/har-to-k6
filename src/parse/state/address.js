const expr = require('../../expression')
const { AddressSpecies } = require('../../enum')

// Assumes query state determined
function address(spec) {
  const state = spec.state.address
  state.variable = variable(spec)
  state.variableStart = variableStart(spec)
  state.species = species(spec)
}

/* Contains variable */
function variable(spec) {
  return expr.variable.test(spec.address)
}

/* Starts with variable */
function variableStart(spec) {
  return expr.variableStart.test(spec.address)
}

function species(spec) {
  return (
    (fixed(spec) && AddressSpecies.Fixed) ||
    (constructed(spec) && AddressSpecies.Constructed) ||
    (resolved(spec) && AddressSpecies.Resolved) ||
    AddressSpecies.Runtime
  )
}

function fixed(spec) {
  return !(spec.state.address.variable || !!spec.query.size)
}

function constructed(spec) {
  return (
    !!spec.query.size &&
    !(spec.state.address.variable || spec.state.query.variable)
  )
}

function resolved(spec) {
  return (
    spec.state.address.variable &&
    !(spec.state.address.variableStart || !!spec.query.size)
  )
}

module.exports = address
