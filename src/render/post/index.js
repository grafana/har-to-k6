const structured = require('./structured')
const unstructured = require('./unstructured')
const { PostSpecies } = require('../../enum')
const { UnrecognizedError } = require('../../error')

function post(spec) {
  switch (spec.state.post.species) {
    case PostSpecies.Empty:
      return null
    case PostSpecies.Unstructured:
      return unstructured(spec)
    case PostSpecies.Structured:
      return structured(spec)
    default:
      throw new UnrecognizedError(
        { name: 'UncrecognizedPostSpecies' },
        `Unrecognized post species: ${spec.state.post.species}`
      )
  }
}

module.exports = post
