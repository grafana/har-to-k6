function indent(text) {
  return text
    .split('\n')
    .map((line) => (line ? `  ${line}` : ``))
    .join('\n')
}

module.exports = indent
