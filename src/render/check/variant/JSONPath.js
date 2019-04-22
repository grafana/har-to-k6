const indent = require('../../indent')
const string = require('../../string')

function JSONPath (name, spec) {
  const item = {
    name,
    value: logic(spec)
  }
  if (spec.comment) {
    item.comment = spec.comment
  }
  return item
}

function logic (spec) {
  return `response => ${body(spec)}`
}

function body (spec) {
  const expression = string(spec.expression)
  const subject = `jsonpath.query(response.json(), ${expression})`
  const content = `!!${subject}.length;`
  return '' +
`{
${indent(content)}
}`
}

module.exports = JSONPath
