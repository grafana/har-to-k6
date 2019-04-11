const undef = void 0

function empty (value) {
  return (
    value === undef ||
    value === null ||
    value === ''
  )
}

// Produce valid encoding not used by enumeration
function extrinsic (enumeration) {
  return Math.max(...Object.values(enumeration)) + 1
}

function makeAssay () {
  return {
    pageIds: new Set(),
    pageIndices: new Set(),
    scopeIndices: new Map()
  }
}

function makeResult () {
  return {
    comment: [],
    pages: new Map(),
    scopes: new Map()
  }
}

function nought (value) {
  return (
    value === undef ||
    value === null
  )
}

Object.assign(exports, {
  empty,
  extrinsic,
  makeAssay,
  makeResult,
  nought
})
