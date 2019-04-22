const { CheckType, PostSpecies, VariableType } = require('../enum')

function imports (archive, result) {
  if (archive.entries) {
    result.imports.http = true
    if (archive.entries.find(entry => entry.pageref)) {
      result.imports.group = true
    }
    if (archive.entries.find(entry => entry.checks && entry.checks.length)) {
      result.imports.check = true
    }
    if (archive.entries.find(jsonPathEntry)) {
      result.imports.jsonpath = true
    }
    if (result.flow.find(formUrlEncodeGroup)) {
      result.imports.formUrlEncode = true
    }
    if (result.flow.find(MimeBuilderGroup)) {
      result.imports.MimeBuilder = true
    }
  }
}

function jsonPathEntry (entry) {
  return (
    (entry.variables && entry.variables.find(jsonPathVariable)) ||
    (entry.checks && entry.checks.find(jsonPathCheck))
  )
}

function jsonPathVariable (variable) {
  return variable.type === VariableType.JSONPath
}

function jsonPathCheck (check) {
  return [
    CheckType.JSONPath,
    CheckType.JSONPathValue
  ].includes(check.type)
}

function formUrlEncodeGroup (group) {
  return group.entries.find(formUrlEncodeEntry)
}

function formUrlEncodeEntry ({ request }) {
  return (
    request.state.post.species === PostSpecies.Structured &&
    request.post.type === 'application/x-www-form-urlencoded' &&
    request.state.params.plural &&
    request.state.params.variable
  )
}

function MimeBuilderGroup (group) {
  return group.entries.find(MimeBuilderEntry)
}

function MimeBuilderEntry ({ request }) {
  return (
    request.state.post.species === PostSpecies.Structured &&
    request.post.type === 'multipart/form-data' &&
    request.state.params.variable
  )
}

module.exports = imports
