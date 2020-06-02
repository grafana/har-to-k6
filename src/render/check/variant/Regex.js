const indent = require('../../indent')
const string = require('../../string')
const subject = require('../subject')

function Regex(name, spec) {
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
    expression: expression(spec),
    flags: flags(spec),
  }
  factor.body = body(spec, factor)
  return `response => ${factor.body}`
}

function expression(spec) {
  return string(spec.expression)
}

function flags(spec) {
  if (spec.flags) {
    return string(spec.flags)
  } else {
    return null
  }
}

function body(spec, factor) {
  if (spec.state.plural) {
    return plural(factor)
  } else {
    return singular(factor)
  }
}

function singular(factor) {
  const content =
    '' +
    `const expr = new RegExp(${args(factor)});
return expr.test(${factor.subject});`
  return (
    '' +
    `{
${indent(content)}
}`
  )
}

function plural(factor) {
  const content =
    '' +
    `const values = ${factor.subject};
const expr = new RegExp(${args(factor)});
return !!values.find(value => expr.test(value));`
  return (
    '' +
    `{
${indent(content)}
}`
  )
}

function args(factor) {
  const items = []
  items.push(factor.expression)
  if (factor.flags) {
    items.push(factor.flags)
  }
  return items.join(`, `)
}

module.exports = Regex
