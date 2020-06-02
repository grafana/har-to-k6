const stringSpecies = require('../../species/string')
const { StringSpecies } = require('../../enum')
const { UnrecognizedError } = require('../../error')

function order(items) {
  items.sort(sort)
}

function sort(a, b) {
  const aSpecies = stringSpecies(a.key)
  const bSpecies = stringSpecies(b.key)
  if (aSpecies === bSpecies) {
    return a.key > b.key ? 1 : a.key < b.key ? -1 : 0
  } else {
    switch (aSpecies) {
      case StringSpecies.Identifier:
        return -1
      case StringSpecies.String:
        switch (bSpecies) {
          case StringSpecies.Identifier:
            return 1
          case StringSpecies.Template:
            return -1
          default:
            throw new UnrecognizedError(
              { name: 'UnrecognizedStringSpecies' },
              `Unrecognized string species: ${bSpecies}`
            )
        }
      case StringSpecies.Template:
        return 1
      default:
        throw new UnrecognizedError(
          { name: 'UnrecognizedStringSpecies' },
          `Unrecognized string species: ${aSpecies}`
        )
    }
  }
}

module.exports = order
