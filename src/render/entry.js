const checks = require('./checks')
const comment = require('./comment')
const request = require('./request')
const variables = require('./variables')

function entry (spec) {
  return [
    header(spec),
    request(spec.request),
    checks(spec.checks),
    variables(spec.variables)
  ].filter(item => item).join(`\n`)
}

function header (spec) {
  const text = [
    spec.comment,
    spec.request.comment
  ].filter(item => item).join(`\n`)
  if (text) {
    return comment(text)
  } else {
    return null
  }
}

module.exports = entry
