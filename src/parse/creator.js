function creator (node, result) {
  const lines = []
  if (node.name) {
    const name = node.name
    if (node.version) {
      lines.push(`Creator: ${name} ${node.version}`)
    } else {
      lines.push(`Creator: ${name}`)
    }
  }
  if (node.comment) {
    lines.push(node.comment)
  }
  if (lines.length) {
    result.comment.push(lines.join(`\n`))
  }
}

module.exports = creator
