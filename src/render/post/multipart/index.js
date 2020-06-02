const fixed = require('./fixed')
const resolved = require('./resolved/arg')
const { UnrecognizedError } = require('../../../error')

function multipart(spec) {
  if (spec.state.params.variable) {
    // Throw error here until emails-js-builder has runtime support via jslib.
    throw new UnrecognizedError(
      { name: 'UnrecognizedStructuredPostType' },
      `Unrecognized resolved post data structure MIME type: ${spec.post.type}`
    )

    // eslint-disable-next-line no-unreachable
    return resolved()
  } else {
    return fixed(spec)
  }
}

module.exports = multipart
