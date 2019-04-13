const checks = require('./checks')
const request = require('./request')
const variables = require('./variables')
const { ExternalScope } = require('../sym')

function entry (node, result) {
  const spec = {
    index: node.index,
    request: {},
    checks: new Map(),
    variables: new Map()
  }
  if (node.comment) {
    comment(node.comment, spec)
  }
  request(node.request, spec.request)
  if (node.checks) {
    checks(node.checks, spec.checks)
  }
  if (node.variables) {
    variables(node.variables, spec.variables)
  }
  scope(node.pageref, spec, result)
}

function comment (value, spec) {
  spec.comment = value
}

function scope (pageref, spec, result) {
  const key = pageref || ExternalScope
  if (!result.scopes.has(key)) {
    result.scopes.set(key, new Set())
  }
  result.scopes.get(key).add(spec)
}

module.exports = entry
