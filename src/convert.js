const parse = require('./parse')
const render = require('./render')

function liHARToK6Script (archive) {
  const result = parse(archive)
  return render(result)
}

module.exports = liHARToK6Script
