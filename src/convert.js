const parse = require('./parse')
const render = require('./render')
const validate = require('./validate')

async function convert(archive) {
  validate(archive)
  const result = parse(archive)

  // NOTE: => render(result) instead of { main: render(result) } ??
  // Then /bin/har-to-k6.js need to change as well.
  return {
    main: render(result),
  }
}

module.exports = convert
