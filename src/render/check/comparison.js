const { CheckCondition } = require('../../enum')
const { UnrecognizedError } = require('../../error')

function comparison(condition, value) {
  switch (condition) {
    case CheckCondition.Contains:
    case CheckCondition.NotContains:
      return `.includes(${value})`
    case CheckCondition.Equals:
      return ` === ${value}`
    case CheckCondition.StartsWith:
      return `.startsWith(${value})`
    case CheckCondition.EndsWith:
      return `.endsWith(${value})`
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedCheckCondition' },
        `Unrecognized check condition: ${condition}`
      )
  }
}

module.exports = comparison
