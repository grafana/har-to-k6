const undef = void 0

function empty (value) {
  return (
    value === undef ||
    value === null ||
    value === ''
  )
}

function emptyObject (value) {
  return !Object.keys(value).length
}

// Produce valid encoding not used by enumeration
function extrinsic (enumeration) {
  return Math.max(...Object.values(enumeration)) + 1
}

function nought (value) {
  return (
    value === undef ||
    value === null
  )
}

Object.assign(exports, {
  empty,
  emptyObject,
  extrinsic,
  nought
})
