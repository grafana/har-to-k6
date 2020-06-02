const params = require('./params')

function postData(node, spec) {
  spec.type = node.mimeType

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
