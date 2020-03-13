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

function isBlacklistedHeader (headerName = '') {
  const HEADERS_BLACKLIST = ['Content-Length']
  const [name] = headerName.split(';')

  return HEADERS_BLACKLIST.some(
    blacklistedHeader => name.toLowerCase() === blacklistedHeader.toLowerCase()
  )
}

function seralizeURLSearchParams (postDataParams = []) {
  return postDataParams.map(({ name, value }) => [name, value].join('=')).join('&')
}

module.exports = {
  seralizeURLSearchParams,
  empty,
  isBlacklistedHeader,
  emptyObject,
  extrinsic,
  nought
}
