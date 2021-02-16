const { PostSpecies } = require('../../enum')
const { parseContentType } = require('../../aid')

function post(spec) {
  const state = spec.state.post
  state.species = species(spec.post)
  state.boundary = boundary(spec.post, state.species)
}

function species(spec) {
  if (spec.params) {
    return PostSpecies.Structured
  } else if (spec.text || spec.type) {
    return PostSpecies.Unstructured
  } else {
    return PostSpecies.Empty
  }
}

function boundary(spec, species) {
  const { mimeType, boundary } = parseContentType(spec.type)
  if (
    species === PostSpecies.Structured &&
    mimeType === 'multipart/form-data'
  ) {
    return boundary || generateBoundary()
  } else {
    return null
  }
}

function generateBoundary() {
  return '------RWWorkerFormDataBoundary' + Math.random().toString(36)
}

module.exports = post
