const sleep = require('./sleep')

function withSleep(flow, spec) {
  const { before, after } = spec

  return [sleep(before), ...flow, sleep(after)].filter((flowItem) => flowItem)
}

module.exports = withSleep
