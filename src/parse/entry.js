const checks = require('./checks')
const request = require('./request')
const state = require('./state/entry')
const variables = require('./variables')
const sleep = require('./sleep')
const { entrySpec: makeEntrySpec } = require('../make')

function entry(node, result) {
  const spec = makeEntrySpec()
  if (node.pageref) {
    spec.page = node.pageref
  }
  if (node.comment) {
    spec.comment = node.comment
  }
  if (node.sleep) {
    spec.sleep = sleep(node.sleep)
  }
  request(node.request, spec.request)
  if (node.checks) {
    checks(node.checks, spec.checks)
  }
  if (node.variables) {
    variables(node.variables, spec.variables)
  }
  state(spec)
  result.entries.push(spec)
}

module.exports = entry
