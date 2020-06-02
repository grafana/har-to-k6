const comparison = require('../comparison')
const indent = require('../../indent')
const string = require('../../string')
const subject = require('../subject')

function Text(name, spec) {
  const item = {
    name,
    value: logic(spec),
  }
  if (spec.comment) {
    item.comment = spec.comment
  }
  return item
}

function logic(spec) {
  const factor = {
    subject: subject(spec.subject),
    comparison: comparison(spec.condition, value(spec)),
    negated: spec.state.negated,
  }
  factor.body = body(spec, factor)
  return `response => ${factor.body}`
}

function value(spec) {
  return string(spec.value)
}

function body(spec, factor) {
  if (spec.state.plural) {
    return plural(factor)
  } else {
    return singular(factor)
  }
}

function singular(factor) {
  return (factor.negated ? '!' : '') + factor.subject + factor.comparison
}

function plural(factor) {
  const cast = factor.negated ? '!' : '!!'
  const content =
    '' +
    `const values = ${factor.subject};
return ${cast}values.find(value => value${factor.comparison});`
  return (
    '' +
    `{
${indent(content)}
}`
  )
}

module.exports = Text
