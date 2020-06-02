const comment = require('../../comment')
const main = require('./main')
const query = require('./query')

function header(spec) {
  const text = [main(spec), query(spec.request)].filter((item) => item).join(`\n\n`)
  if (text) {
    return comment(text)
  } else {
    return null
  }
}

module.exports = header
