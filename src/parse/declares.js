const { AddressSpecies, PostSpecies, VariableType } = require('../enum')

function declares (archive, result) {
  if (archive.log.entries) {
    result.declares.add('response')
    const entries = archive.log.entries
    if (result.flow.find(addressGroup)) {
      result.declares.add('address')
    }
    if (result.flow.find(bodyGroup)) {
      result.declares.add('body')
    }
    if (entries.find(matchEntry)) {
      result.declares.add('match')
    }
  }
}

function addressGroup (group) {
  return group.entries.find(addressEntry)
}

function addressEntry ({ request }) {
  return (request.state.address.species === AddressSpecies.Runtime)
}

function bodyGroup (group) {
  return group.entries.find(bodyEntry)
}

function bodyEntry ({ request }) {
  return (
    request.state.post.species === PostSpecies.Structured &&
    request.post.type === 'multipart/form-data' &&
    request.state.params.variable
  )
}

function matchEntry (entry) {
  return (
    entry.variables &&
    entry.variables.find(matchVariable)
  )
}

function matchVariable (variable) {
  return (variable.type === VariableType.Regex)
}

module.exports = declares
