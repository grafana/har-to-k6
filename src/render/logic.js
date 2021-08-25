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
  ].filter((item) => item)

  const { exportAs = 'main', namedExport = false } = result
  const exportType = namedExport ? 'export' : 'export default'

  return `${exportType} function ${exportAs}() ${block(content)}`
}

module.exports = logic
