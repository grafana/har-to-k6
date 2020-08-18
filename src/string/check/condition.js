const { CheckCondition } = require('../../enum')
const { UnrecognizedError } = require('../../error')

function condition(value) {
  switch (value) {
    case CheckCondition.Contains:
      return 'contains'
    case CheckCondition.NotContains:
      return 'does not contain'
    case CheckCondition.Equals:
      return 'equals'
    case CheckCondition.StartsWith:
      return 'starts with'
    case CheckCondition.EndsWith:
      return 'ends with'
    case CheckCondition.TypeOf:
      return 'is'
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedCheckCondition' },
        `Unrecognized check condition: ${value}`
      )
  }
}

module.exports = condition
