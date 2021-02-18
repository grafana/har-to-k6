const text = require('../../../text')

function generateMultipartFixedPre(params, boundary) {
  return (
    [
      `formData = new FormData();`,
      `formData.boundary = ${text(boundary)};`,
      ...generateAppendData(params),
    ].join('\n') + '\n'
  )
}

function generateAppendData(params) {
  return Array.from(params).reduce((acc, [name, valueSet]) => {
    valueSet.forEach((value) => {
      const data = `data: ${text(value.value)}`

      let fileName = ''
      let contentType = `, content_type: ${text('text/plain')}`

      if (value.fileName) {
        fileName = `, filename: ${text(value.fileName)}`
      }

      if (value.type) {
        contentType = `, content_type: ${text(value.type)}`
      }

      acc.push(
        `formData.append(${text(name)}, {${data}${fileName}${contentType}});`
      )
    })

    return acc
  }, [])
}

module.exports = generateMultipartFixedPre
