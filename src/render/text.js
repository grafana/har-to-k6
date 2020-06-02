const string = require('./string')
const template = require('./template')
const { variable } = require('../expression')

// Render text in simplest possible form
function text(value, delimiter) {
  if (resolved(value)) {
    return template(value, delimiter)
  } else {
    return string(value, delimiter)
  }
}

function resolved(value) {
  if (typeof value === 'string') {
    return variable.test(value)
  } else {
    return value.findIndex((item) => variable.test(item)) !== -1
  }
}

module.exports = text
