function addressState() {
  return {
    variable: null,
    variableStart: null,
    species: null,
  }
}

function assay() {
  return {
    pageIds: new Set(),
    requestCheckNames: new Map(),
    requestCookieNames: new Map(),
  }
}

function checkState() {
  return {
    negated: null,
    plural: null,
  }
}

function entrySpec() {
  return {
    page: null,
    sleep: null,
    request: requestSpec(),
    checks: new Map(),
    variables: new Map(),
    state: entryState(),
  }
}

function entryState() {
  return {
    expanded: null,
  }
}

function imports() {
  return {
    sleep: false,
    group: false,
    check: false,
    http: false,

    // jslib.k6.io
    URLSearchParams: false,
    URL: false,

    jsonpath: false,
    MimeBuilder: false,
  }
}

function paramsState() {
  return {
    plural: null,
    variable: null,
  }
}

function postState() {
  return {
    species: null,
    boundary: null,
  }
}

function queryState() {
  return {
    variable: null,
  }
}

function requestFactor() {
  return {
    method: null,
    capacity: null,
    address: null,
    body: null,
    headers: null,
    cookies: null,
    options: null,
    pre: [],
  }
}

function requestSpec() {
  return {
    method: null,
    address: null,
    query: new Map(),
    headers: new Map(),
    cookies: new Map(),
    post: {},
    state: requestState(),
  }
}

function requestState() {
  return {
    address: addressState(),
    query: queryState(),
    post: postState(),
    params: paramsState(),
  }
}

function result() {
  return {
    comment: [],
    options: {},
    pages: new Map(),
    entries: [],
    flow: [],
    imports: imports(),
    declares: new Set(),
  }
}

module.exports = {
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
  result,
}
