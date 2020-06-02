const constructed = require('./constructed')
const fixed = require('./fixed')
const resolved = require('./resolved')
const runtime = require('./runtime')
const { AddressSpecies } = require('../../enum')
const { UnrecognizedError } = require('../../error')

function address(spec, factor) {
  switch (spec.state.address.species) {
    case AddressSpecies.Fixed:
      fixed(spec, factor)
      break
    case AddressSpecies.Constructed:
      constructed(spec, factor)
      break
    case AddressSpecies.Resolved:
      resolved(spec, factor)
      break
    case AddressSpecies.Runtime:
      runtime(spec, factor)
      break
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedAddressSpecies' },
        `Unrecognized address species: ${spec.state.address.species}`
      )
  }
}

module.exports = address
