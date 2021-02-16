const text = require('../../../text')

function generateMultipartFixedPre(params, boundary) {
  return (
    [
      `let formData = new FormData();`,
      `formData.boundary = ${text(boundary)};`,
      ...generateAppendData(params),
    ].join('\n') + '\n'
  )
}

function generateAppendData(params) {
  return Array.from(params).reduce((acc, [name, valueSet]) => {
    valueSet.forEach((value) => {
      const data = `data: ${text(value.value)}`
      const fileName = value.fileName
        ? `, fileName: ${text(value.fileName)}`
        : ''
      const contentType = value.type
        ? `, content_type: ${text(value.type)}`
        : ''

      acc.push(
        `formData.append(${text(name)}, {${data}${fileName}${contentType}});`
      )
    })

    return acc
  }, [])
}

module.exports = generateMultipartFixedPre
