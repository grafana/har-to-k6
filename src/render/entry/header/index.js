const comment = require('../../comment')
const main = require('./main')

function header (spec) {
  const text = [
    main(spec)
  ].filter(item => item).join(`\n\n`)
  if (text) {
    return comment(text)
  } else {
    return null
  }
}

module.exports = header
