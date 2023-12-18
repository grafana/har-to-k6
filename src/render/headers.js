const header = require('./header')
const object = require('./object')

function filterHeaders(allEntries) {
  const preGeneratedHeaders = [
    'sec-websocket-key',
    'upgrade',
    'sec-websocket-version',
    'sec-websocket-extensions',
    'connection',
  ]
  const entries = allEntries.filter(function (current) {
    if (current === undefined) {
      return current
    }
    return !preGeneratedHeaders.includes(current.name.toLowerCase())
  })
  return entries
}

function headers(spec) {
  if (spec.size) {
    const entries = [...spec].map(([name, items]) => header(name, items))
    const filteredEntries = filterHeaders(entries)
    return object(filteredEntries)
  } else {
    return null
  }
}

module.exports = headers
