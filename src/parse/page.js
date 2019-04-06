function page (node, i, result) {
  const spec = {
    name: node.title,
    index: node.index,
    entries: []
  }
  comment(node, spec)
  result.pages.set(node.id, spec)
}

function comment (node, spec) {
  if (node.comment) {
    spec.comment = node.comment
  }
}

module.exports = page
