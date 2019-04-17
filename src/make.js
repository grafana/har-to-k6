function assay () {
  return {
    pageIds: new Set(),
    pageIndices: new Set(),
    scopeIndices: new Map(),
    requestCheckNames: new Map(),
    requestCookieNames: new Map()
  }
}

function requestSpec () {
  return {
    method: null,
    address: null,
    query: new Map(),
    headers: new Map(),
    cookies: new Map(),
    post: {}
  }
}

function result () {
  return {
    comment: [],
    pages: new Map(),
    scopes: new Map(),
    flow: []
  }
}

Object.assign(exports, {
  assay,
  requestSpec,
  result
})
