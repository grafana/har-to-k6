const { PostSpecies } = require('../../enum')
const { parseContentType } = require('../../aid')

function post(spec) {
  const state = spec.state.post
  state.species = species(spec.post)
  state.boundary = boundary(spec, state.species)
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
  // Currently headers might be specified uppercased or lowercased
  const contentType =
    spec.headers.get('Content-Type') || spec.headers.get('content-type')

  if (!contentType) {
    return null
  }

  const headerValue = [...contentType].find((t) =>
    t.value.includes('multipart/form-data')
  )

  if (!headerValue) {
    return null
  }

  const { boundary } = parseContentType(headerValue.value)

  if (species === PostSpecies.Structured) {
    return boundary || generateBoundary()
  } else {
    return null
  }
}

function generateBoundary() {
  return '------RWWorkerFormDataBoundary' + Math.random().toString(36)
}

module.exports = post
