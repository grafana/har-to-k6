const string = require('../string')
const stringSpecies = require('../../species/string')
const template = require('../template')
const { StringSpecies } = require('../../enum')
const { UnrecognizedError } = require('../../error')

function key(value) {
  switch (stringSpecies(value)) {
    case StringSpecies.Identifier:
      return value
    case StringSpecies.String:
      return string(value)
    case StringSpecies.Template:
      return `[${template(value)}]`
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedStringSpecies' },
        `Unrecognized string species: ${value}`
      )
  }
}

module.exports = key
