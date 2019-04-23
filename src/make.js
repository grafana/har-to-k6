function addressState () {
  return {
    variable: null,
    variableStart: null,
    species: null
  }
}

function assay () {
  return {
    pageIds: new Set(),
    pageIndices: new Set(),
    scopeIndices: new Map(),
    requestCheckNames: new Map(),
    requestCookieNames: new Map()
  }
}

function checkState () {
  return {
    negated: null,
    plural: null
  }
}

function entrySpec () {
  return {
    index: null,
    request: requestSpec(),
    checks: new Map(),
    variables: new Map(),
    state: entryState()
  }
}

function entryState () {
  return {
    expanded: null
  }
}

function imports () {
  return {
    group: false,
    check: false,
    http: false,
    jsonpath: false,
    formUrlEncode: false,
    MimeBuilder: false
  }
}

function paramsState () {
  return {
    plural: null,
    variable: null
  }
}

function postState () {
  return {
    species: null
  }
}

function queryState () {
  return {
    variable: null
  }
}

function requestFactor () {
  return {
    method: null,
    address: null,
    body: null,
    headers: null,
    cookies: null,
    options: null,
    pre: []
  }
}

function requestSpec () {
  return {
    method: null,
    address: null,
    query: new Map(),
    headers: new Map(),
    cookies: new Map(),
    post: {},
    state: requestState()
  }
}

function requestState () {
  return {
    address: addressState(),
    query: queryState(),
    post: postState(),
    params: paramsState()
  }
}

function result () {
  return {
    comment: [],
    pages: new Map(),
    scopes: new Map(),
    flow: [],
    imports: imports(),
    declares: new Set()
  }
}

Object.assign(exports, {
  addressState,
  assay,
  checkState,
  entrySpec,
  entryState,
  imports,
  paramsState,
  postState,
  queryState,
  requestFactor,
  requestSpec,
  requestState,
  result
})
