const block = require('./block')
const declares = require('./declares')
const flow = require('./flow')
const variableSpace = require('./variableSpace')
const defaultSleep = require('./defaultSleep')

function logic(result) {
  const content = [
    declares(result.declares),
    variableSpace(result),
    flow(result),
    defaultSleep(result),
  ].filter(item => item)

  const exportAs = result.exportAs ? result.exportAs : 'main'

  // default unless defaultExport is explicitly set to false
  const exportType =
    result.defaultExport !== false ? 'export default' : 'export'

  return `${exportType} function ${exportAs}() ${block(content)}`
}

module.exports = logic
