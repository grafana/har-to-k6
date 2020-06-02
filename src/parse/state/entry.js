const { PostSpecies } = require('../../enum')

function entry(spec) {
  spec.state.expanded = expanded(spec)
}

/*
 * Render in expanded group
 *
 * Any of:
 * - Has body.
 * - Has check.
 * - Has variable extraction.
 */
function expanded(spec) {
  return (
    spec.request.state.post.species !== PostSpecies.Empty || spec.checks.size || spec.variables.size
  )
}

module.exports = entry
