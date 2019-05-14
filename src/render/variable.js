const comment = require('./comment')
const string = require('./string')
const text = require('./text')
const { VariableType } = require('../enum')
const { UnrecognizedError } = require('../error')

function variable (name, item) {
  return [
    note(item),
    logic(name, item)
  ].filter(item => item).join(`\n`)
}

function note (item) {
  if (item.comment) {
    return comment(item.comment)
  } else {
    return null
  }
}

function logic (name, { type, expression }) {
  switch (type) {
    case VariableType.JSONPath:
      return JSONPath(name, expression)
    case VariableType.Regex:
      return Regex(name, expression)
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedVariableType' },
        `Unrecognized variable type: ${type}`
      )
  }
}

function JSONPath (name, expression) {
  const extract = `jsonpath.query(response.json(), ${string(expression)})[0]`
  return `vars[${text(name)}] = ${extract};`
}

function Regex (name, expression) {
  return '' +
`match = new RegExp(${string(expression)}).exec(response.body);
vars[${text(name)}] = match ? match[1] || match[0] : null;`
}

module.exports = variable
