const string = require('./string')
const template = require('./template')
const { variable } = require('../expression')

// Render text in simplest possible form
function text (address) {
  if (variable.test(address)) {
    return template(address)
  } else {
    return string(address)
  }
}

module.exports = text
