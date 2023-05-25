const multipart = require('./multipart')
const json = require('./json')
const url = require('./url')
const { UnrecognizedError } = require('../../error')
const { getContentTypeValue } = require('../../aid')

function structured(spec) {
  switch (getContentTypeValue(spec.post.type)) {
    case 'application/x-www-form-urlencoded':
      return url(spec)
    case 'multipart/form-data':
      return multipart(spec)
    case 'application/json':
      return json(spec)
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedStructuredPostType' },
        `Unrecognized structured post data MIME type: ${spec.post.type}`
      )
  }
}

module.exports = structured
