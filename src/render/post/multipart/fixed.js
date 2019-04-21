const MimeBuilder = require('emailjs-mime-builder').default
const string = require('../../string')

// Multipart encoded post data without variable
function fixed (params) {
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

module.exports = fixed
