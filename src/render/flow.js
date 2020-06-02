const entry = require('./entry')
const group = require('./group')
const { FlowItemType } = require('../enum')
const { UnrecognizedError } = require('../error')

function flow(result) {
  if (result.flow.length) {
    const sections = result.flow.map((spec) => item(spec))
    return sections.join(`\n\n`)
  } else {
    return null
  }
}

function item(spec) {
  switch (spec.type) {
    case FlowItemType.External:
      return entry(spec.entry)
    case FlowItemType.Group:
      return group(spec)
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedFlowItemType' },
        `Unrecognized flow item type: ${spec.type}`
      )
  }
}

module.exports = flow
