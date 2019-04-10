const parse = require('./parse')
const render = require('./render')
const validate = require('./validate')

function liHARToK6Script (archive) {
  validate(archive)
  const result = parse(archive)
  return render(result)
}

module.exports = liHARToK6Script
