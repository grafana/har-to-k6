function browser(node, result) {
  const lines = []
  if (node.name) {
    if (node.version) {
      lines.push(`Browser: ${node.name} ${node.version}`)
    } else {
      lines.push(`Browser: ${node.name}`)
    }
  }
  if (node.comment) {
    lines.push(node.comment)
  }
  if (lines.length) {
    result.comment.push(lines.join(`\n`))
  }
}

module.exports = browser
