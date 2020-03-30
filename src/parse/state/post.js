const { generateBoundary } = require('emailjs-mime-builder/dist/utils')
const { PostSpecies } = require('../../enum')

function post (spec) {
  const state = spec.state.post
  state.species = species(spec.post)
  state.boundary = boundary(spec.post, state.species)
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

function boundary (spec, species) {
  if (species === PostSpecies.Structured && spec.type.split(';')[0] === 'multipart/form-data') {
    return generateBoundary(1, Date.now().toString() + Math.random())
  } else {
    return null
  }
}

module.exports = post
