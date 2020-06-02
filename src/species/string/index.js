const identifier = require('./identifier')
const template = require('./template')
const { StringSpecies } = require('../../enum')

function string(value) {
  if (template(value)) {
    return StringSpecies.Template
  } else if (identifier(value)) {
    return StringSpecies.Identifier
  } else {
    return StringSpecies.String
  }
}

module.exports = string
