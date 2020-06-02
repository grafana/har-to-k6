const { lineBreak, multilineCommentEnds } = require('../expression')

function comment(text) {
  if (lineBreak.test(text)) {
    return multiline(text)
  } else {
    return `// ${text}`
  }
}

function multiline(text) {
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

function encode(text) {
  return text.replace(multilineCommentEnds, '* /')
}

module.exports = comment
