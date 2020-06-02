const variant = require('./variant')
const { CheckType } = require('../../enum')
const { UnrecognizedError } = require('../../error')

function check(name, spec) {
  switch (spec.type) {
    case CheckType.Text:
      return variant.Text(name, spec)
    case CheckType.JSONPathValue:
      return variant.JSONPathValue(name, spec)
    case CheckType.JSONPath:
      return variant.JSONPath(name, spec)
    case CheckType.Regex:
      return variant.Regex(name, spec)
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedCheckType' },
        `Unrecognized check type: ${spec.type}`
      )
  }
}

module.exports = check
