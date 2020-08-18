const { CheckCondition, TypeOfOptions } = require('../../../enum')
const { UnrecognizedError } = require('../../../error')

const { js, from } = require('../../../codegen')

function predicate({ condition, value }) {
  switch (condition) {
    case CheckCondition.Contains:
      return js`values => values.includes(${value})`

    case CheckCondition.NotContains:
      return js`values => !values.includes(${value})`

    case CheckCondition.Equals:
      return js`value => value === ${value}`

    case CheckCondition.StartsWith:
      return js`value => value.startsWith(${value})`

    case CheckCondition.EndsWith:
      return js`value => value.endsWith(${value})`

    case CheckCondition.TypeOf:
      if (value === TypeOfOptions.Null) {
        return js`value => value === null`
      }

      if (value === TypeOfOptions.Array) {
        return js`value => Array.isArray(value)`
      }

      return js`value => typeof value === ${value}`

    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedCheckCondition' },
        `Unrecognized check condition: ${condition}`
      )
  }
}

const template = js`
  response => jsonpath.query(response.json(), ${from('expression')})
    .some(${predicate})
`

function JSONPathValue(name, { comment, condition, expression, value, state }) {
  return {
    name,
    comment,
    value: template({ condition, expression, value, negated: state.negated }),
  }
}

module.exports = JSONPathValue
