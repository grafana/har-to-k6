const sleep = require('./sleep')

function withSleep(flow, spec) {
  const before = spec.filter(({ before }) => before).map(({ before }) => before)
  const after = spec.filter(({ after }) => after).map(({ after }) => after)

  return [
    before.map(sleep).join('\n'),
    ...flow,
    after.map(sleep).join('\n'),
  ].filter((flowItem) => flowItem)
}

module.exports = withSleep
