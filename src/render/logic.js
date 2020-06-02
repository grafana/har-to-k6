const block = require('./block')
const declares = require('./declares')
const flow = require('./flow')
const variableSpace = require('./variableSpace')

function logic(result) {
  const content = [
    declares(result.declares),
    variableSpace(result),
    flow(result),
    // FIXME: Integrate sleep better
    `sleep(1);`,
  ].filter((item) => item)
  return `export default function() ${block(content)}`
}

module.exports = logic
