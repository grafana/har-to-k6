const prettify = require('./prettify')
const root = require('./root')

function render(result, imports) {
  const raw = root(result, imports)
  return prettify(raw)
}

module.exports = render
