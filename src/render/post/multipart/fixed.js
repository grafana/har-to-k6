const comment = require('../../comment')
const MimeBuilder = require('emailjs-mime-builder').default
const note = require('../../note/map')
const string = require('../../string')

// Multipart encoded post data without variable
function fixed (params) {
  return [
    description(params),
    value(params)
  ].filter(item => item).join(`\n`)
}

function value (params) {
  const message = new MimeBuilder('multipart/form-data')
  for (const [ name, items ] of params) {
    for (const item of items) {
      message.createChild(item.contentType, { filename: item.fileName })
        .setHeader('Content-Disposition', `form-data; name=${name}`)
        .setContent(item.value || '')
    }
  }
  const encoded = message.build()
  return string(encoded)
}

function description (params) {
  const content = note(params)
  if (content) {
    return comment(content)
  } else {
    return null
  }
}

module.exports = fixed
