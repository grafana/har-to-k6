const prettier = require('prettier')

function prettify (raw) {
  return prettier.format(raw, { semi: true, parser: 'babel' })
}

module.exports = prettify
