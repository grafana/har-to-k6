const comparison = require('../comparison')
const indent = require('../../indent')
const string = require('../../string')

function JSONPathValue (name, spec) {
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
  const factor = {
    subject: subject(spec),
    comparison: comparison(spec.condition, value(spec)),
    negated: spec.state.negated
  }
  factor.body = body(factor)
  return `response => ${factor.body}`
}

function subject (spec) {
  return `jsonpath.query(response.json(), ${string(spec.expression)})`
}

function value (spec) {
  return string(spec.value)
}

function body (factor) {
  const cast = (factor.negated ? '!' : '!!')
  const content = '' +
`const values = ${factor.subject};
return ${cast}values.find(value => value${factor.comparison});`
  return '' +
`{
${indent(content)}
}`
}

module.exports = JSONPathValue
