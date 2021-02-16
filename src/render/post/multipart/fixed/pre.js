const text = require('../../../text')

function generateMultipartFixedPre(params, boundary) {
  const preRequestLogic = []

  preRequestLogic.push(initializeFormData())
  preRequestLogic.push(setBoundary(boundary))
  preRequestLogic.push(...appendData(params))

  return `${preRequestLogic.join(`\n`)}\n`
}

function initializeFormData() {
  return `formData = new FormData();`
}

function setBoundary(boundary) {
  return `formData.boundary = ${text(boundary)};`
}

function generateFileData(value) {
  const data = `data: ${text(value.value)}`
  const fileName = value.fileName ? `, fileName: ${text(value.fileName)}` : ''
  const contentType = value.type ? `, content_type: ${text(value.type)}` : ''

  return `{${data}${fileName}${contentType}}`
}

function appendData(params) {
  const appends = []

  for (const [name, values] of params) {
    for (const value of values) {
      appends.push(
        `formData.append(${text(name)}, ${generateFileData(value)});`
      )
    }
  }

  return appends
}

module.exports = generateMultipartFixedPre
