const string = require('./string')
const template = require('./template')
const { variable } = require('../expression')

// Render text in simplest possible form
function text (value) {
  if (variable.test(value)) {
    return template(value)
  } else {
    return string(value)
  }
}

module.exports = text
