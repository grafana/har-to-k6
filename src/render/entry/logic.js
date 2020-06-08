const checks = require('../checks')
const request = require('../request')
const variables = require('../variables')
const withSleep = require('../withSleep')

function logic(spec) {
  let flow = [
    request(spec.request),
    checks(spec.checks),
    variables(spec.variables),
  ]

  if (spec.sleep) {
    flow = withSleep(flow, spec.sleep)
  }

  return flow.filter((item) => item).join(`\n`)
}

module.exports = logic
