const block = require('./block')
const declares = require('./declares')
const flow = require('./flow')
const variableSpace = require('./variableSpace')
const defaultSleep = require('./defaultSleep')

function logic(result, defaultExport = true) {
  const content = [
    declares(result.declares),
    variableSpace(result),
    flow(result),
    defaultSleep(result),
  ].filter(item => item)

  const exportAs = result.exportAs ? result.exportAs : 'main'
  const exportType = defaultExport ? 'export default' : 'export'

  return `${exportType} function ${exportAs}() ${block(content)}`
}

module.exports = logic
