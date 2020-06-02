const comment = require('../../../comment')
const text = require('../../../text')

// Prerequest logic
function pre(params) {
  const logic = []
  logic.push(`body = new MimeBuilder("multipart/form-data");`)
  for (const [name, items] of params) {
    for (const item of items) {
      logic.push(entry(name, item))
    }
  }
  return logic.join(`\n`)
}

function entry(name, item) {
  const logic = []
  if (item.comment) {
    logic.push(comment(item.comment))
  }
  const args = []
  if (item.contentType || item.fileName) {
    args.push(type(item))
    if (item.fileName) {
      args.push(fileName(item))
    }
  }
  logic.push(
    '' +
      `body.createChild(${args.join(`, `)})
  .setHeader("Content-Disposition", ${disposition(name)})
  .setHeader("Content-Transfer-Encoding", "${item.fileName ? 'base64' : 'quoted-printable'}")
  .setContent(${value(item)});`
  )
  return logic.join(`\n`)
}

function type(item) {
  if (item.contentType) {
    return text(item.contentType)
  } else {
    return `null`
  }
}

function fileName(item) {
  return `{ filename: ${text(item.fileName)} }`
}

function disposition(name) {
  return text(`form-data; name=${name}`)
}

function value(item) {
  return text(item.value || '')
}

module.exports = pre
