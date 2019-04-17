const checks = require('../checks')
const request = require('../request')
const variables = require('../variables')

function logic (spec) {
  return [
    request(spec.request),
    checks(spec.checks),
    variables(spec.variables)
  ].filter(item => item).join(`\n`)
}

module.exports = logic
