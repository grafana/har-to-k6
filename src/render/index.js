const prettify = require('./prettify')
const root = require('./root')

function render(result) {
  const raw = root(result)
  return prettify(raw)
}

module.exports = render
