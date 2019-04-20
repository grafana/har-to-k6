const { PostSpecies } = require('../../enum')

function post (spec) {
  const state = spec.state.post
  state.species = species(spec.post)
}

function species (spec) {
  if (spec.params) {
    return PostSpecies.Structured
  } else if (spec.text || spec.type) {
    return PostSpecies.Unstructured
  } else {
    return PostSpecies.Empty
  }
}

module.exports = post
