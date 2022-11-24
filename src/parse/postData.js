const { empty } = require('../aid')
const params = require('./params')

function inferMimeType(node) {
  if (!empty(node.mimeType)) {
    return node.mimeType
  }

  if (Array.isArray(node.params) && node.params.length > 0) {
    return 'application/x-www-form-urlencoded'
  }

  try {
    const body = JSON.parse(node.text)

    // We only assume it to be JSON if it's an object or array, because
    // any other value might just as well be arbitrary text.
    if (typeof body === 'object' && body !== null) {
      return 'application/json'
    }
  } catch {
    // Must not be JSON then.
  }

  return 'text/plain'
}

function postData(node, spec) {
  spec.type = inferMimeType(node)

  if (node.params && node.params.length) {
    spec.params = new Map()
    params(node.params, spec.params)
  } else if (node.text) {
    spec.value = node.text
  }

  if (node.comment) {
    spec.comment = node.comment
  }
}

module.exports = postData
