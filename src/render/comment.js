function comment (text) {
  if (/\n/.test(text)) {
    return multiline(text)
  } else {
    return `// ${text}`
  }
}

function multiline (text) {
  const lines = []
  lines.push(`/*`)
  for (const raw of text.split('\n')) {
    const encoded = encode(raw)
    const line = ` * ${encoded}`
    lines.push(line)
  }
  lines.push(` */`)
  return lines.join(`\n`)
}

function encode (text) {
  return text.replace(/\*\//g, '* /')
}

module.exports = comment
