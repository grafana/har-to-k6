const parse = require('./parse')
const render = require('./render')
const validate = require('./validate')
const normalize = require('./normalize')
const { DEFAULT_OPTIONS } = require('./constants')

async function convert(archive, options = DEFAULT_OPTIONS) {
  const source = normalize(archive, options)

  validate(source)
  const result = parse(source)

  // NOTE: => render(result) instead of { main: render(result) } ??
  // Then /bin/har-to-k6.js need to change as well.
  return {
    main: render(result),
  }
}

module.exports = convert
