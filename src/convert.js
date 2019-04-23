const compat = require('./build/compat')
const parse = require('./parse')
const render = require('./render')
const validate = require('./validate')

async function convert (archive) {
  validate(archive)
  const result = parse(archive)
  return {
    main: render(result),
    compat: await compat(result)
  }
}

module.exports = convert
