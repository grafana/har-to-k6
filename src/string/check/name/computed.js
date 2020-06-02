const JSONPath = require('./JSONPath')
const JSONPathValue = require('./JSONPathValue')
const Regex = require('./Regex')
const Text = require('./Text')
const { CheckType } = require('../../../enum')
const { UnrecognizedError } = require('../../../error')

function computed(node) {
  switch (node.type) {
    case CheckType.JSONPath:
      return JSONPath(node)
    case CheckType.JSONPathValue:
      return JSONPathValue(node)
    case CheckType.Regex:
      return Regex(node)
    case CheckType.Text:
      return Text(node)
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedCheckType' },
        `Unrecognized check type: ${node.type}`
      )
  }
}

module.exports = computed
