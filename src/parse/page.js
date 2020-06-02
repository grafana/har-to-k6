function page(node, result) {
  const nameParts = []

  node.id && nameParts.push(node.id)
  node.title && nameParts.push(node.title)

  const spec = {
    name: nameParts.join(' - '),
  }

  if (node.comment) {
    spec.comment = node.comment
  }
  result.pages.set(node.id, spec)
}

module.exports = page
