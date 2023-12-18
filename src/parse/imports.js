const {
  CheckType,
  FlowItemType,
  PostSpecies,
  AddressSpecies,
  VariableType,
} = require('../enum')

const { UnrecognizedError } = require('../error')
const { isMultipartFormData, isWebsocket } = require('../aid')

function imports(archive, result) {
  if (archive.log.entries) {
    result.imports.http = true
    result.imports.sleep = true
    const entries = archive.log.entries

    if (entries.find(entry => entry.pageref)) {
      result.imports.group = true
    }

    if (entries.find(entry => entry.checks && entry.checks.length)) {
      result.imports.check = true
    }

    if (entries.find(jsonPathEntry)) {
      result.imports.jsonpath = true
    }

    if (entries.find(isMultipartFormData)) {
      result.imports.formData = true
    }

    if (result.flow.find(formUrlEncodeFlowItem)) {
      result.imports.URLSearchParams = true
    }

    if (result.flow.find(URLFlowItem)) {
      result.imports.URL = true
    }

    if (result.flow.find(MimeBuilderFlowItem)) {
      result.imports.MimeBuilder = true
    }
    if (webSocketItem(entries)) {
      result.imports.websocket = true
    }
    if (requestItem(entries)) {
      result.imports.http = true
    }
  }
}

function webSocketItem(entries) {
  // This function checkes to see if a request is a websocket
  //  request to make sure imports has websocket true
  const check = ({ request }) => isWebsocket(request.url)
  return entries.find(check)
}

function requestItem(entries) {
  // This function checkes to see if a request is NOT a websocket
  //  request to make sure imports has http true
  const check = ({ request }) => !isWebsocket(request.url)
  return entries.find(check)
}

function jsonPathEntry(entry) {
  return (
    (entry.variables && entry.variables.find(jsonPathVariable)) ||
    (entry.checks && entry.checks.find(jsonPathCheck))
  )
}

function jsonPathVariable(variable) {
  return variable.type === VariableType.JSONPath
}

function jsonPathCheck(check) {
  return [CheckType.JSONPath, CheckType.JSONPathValue].includes(check.type)
}

function formUrlEncodeFlowItem(item) {
  switch (item.type) {
    case FlowItemType.External:
      return formUrlEncodeEntry(item.entry)
    case FlowItemType.Group:
      return item.entries.find(formUrlEncodeEntry)
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedFlowItemType' },
        `Unrecognized flow item type: ${item.type}`
      )
  }
}

function URLFlowItem(item) {
  const check = ({ request }) =>
    request.state.address.species === AddressSpecies.Runtime

  switch (item.type) {
    case FlowItemType.External:
      return check(item.entry)
    case FlowItemType.Group:
      return item.entries.find(check)
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedFlowItemType' },
        `Unrecognized flow item type: ${item.type}`
      )
  }
}

function formUrlEncodeEntry({ request }) {
  return (
    request.state.post.species === PostSpecies.Structured &&
    request.post.type === 'application/x-www-form-urlencoded' &&
    request.state.params.plural &&
    request.state.params.variable
  )
}

function MimeBuilderFlowItem(item) {
  switch (item.type) {
    case FlowItemType.External:
      return MimeBuilderEntry(item.entry)
    case FlowItemType.Group:
      return item.entries.find(MimeBuilderEntry)
    default:
      throw new UnrecognizedError(
        { name: 'UnrecognizedFlowItemType' },
        `Unrecognized flow item type: ${item.type}`
      )
  }
}

function MimeBuilderEntry({ request }) {
  return (
    request.state.post.species === PostSpecies.Structured &&
    request.post.type === 'multipart/form-data' &&
    request.state.params.variable
  )
}

module.exports = imports
