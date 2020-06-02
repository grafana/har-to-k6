const undef = void 0

function empty(value) {
  return value === undef || value === null || value === ''
}

function emptyObject(value) {
  return !Object.keys(value).length
}

function objectFromEntries(entries) {
  if (Object.fromEntries) {
    return Object.fromEntries(entries)
  }

  return entries.reduce((obj, [key, val]) => {
    return {
      ...obj,
      [key]: val,
    }
  }, {})
}

function isString(x) {
  return Object.prototype.toString.call(x) === '[object String]'
}

// Produce valid encoding not used by enumeration
function extrinsic(enumeration) {
  return Math.max(...Object.values(enumeration)) + 1
}

function nought(value) {
  return value === undef || value === null
}

function parseContentType(str = '') {
  const [mimeType, ...rest] = str.split(';').map((s) => s.trim())
  const params = objectFromEntries(rest.map((s) => s.split('=')))

  return {
    ...params,
    mimeType,
  }
}

function getContentTypeValue(str = '') {
  return str.split(';')[0]
}

function isBlacklistedHeader(headerName = '') {
  const HEADERS_BLACKLIST = ['Content-Length']
  const [name] = headerName.split(';')

  return HEADERS_BLACKLIST.some(
    (blacklistedHeader) => name.toLowerCase() === blacklistedHeader.toLowerCase()
  )
}

function seralizeURLSearchParams(postDataParams = []) {
  return postDataParams.map(({ name, value }) => [name, value].join('=')).join('&')
}

module.exports = {
  seralizeURLSearchParams,
  empty,
  isBlacklistedHeader,
  emptyObject,
  isString,
  extrinsic,
  nought,
  parseContentType,
  getContentTypeValue,
}
