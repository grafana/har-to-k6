function page (node, result) {
  const spec = {
    name: node.title,
    index: node.index,
    entries: []
  }
  if (node.comment) {
    comment(node.comment, spec)
  }
  result.pages.set(node.id, spec)
}

function comment (value, spec) {
  spec.comment = value
}

module.exports = page
