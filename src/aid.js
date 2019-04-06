const undef = void 0
function empty (value) {
  return (
    value === undef ||
    value === null ||
    value === ''
  )
}

function makeAssay () {
  return {
    pageIds: new Set(),
    pageIndices: new Set()
  }
}

function makeResult () {
  return {
    comment: [],
    pages: new Map()
  }
}

Object.assign(exports, {
  empty,
  makeAssay,
  makeResult
})
