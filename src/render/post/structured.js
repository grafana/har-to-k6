const multipart = require('./multipart')
const url = require('./url')
const { UnrecognizedError } = require('../../error')

function structured (spec) {
  switch (spec.post.type) {
    case 'application/x-www-form-urlencoded':
      return url(spec)
    case 'multipart/form-data':
      return multipart(spec)
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedStructuredPostType' },
        `Unrecognized structured post data MIME type: ${spec.post.type}`
      )
  }
}

module.exports = structured
