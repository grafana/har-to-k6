function page (node, result) {
  const spec = {
    name: node.title
  }
  if (node.comment) {
    spec.comment = node.comment
  }
  result.pages.set(node.id, spec)
}

module.exports = page
