// Use standalone for browser compatibility
const prettier = require('prettier/standalone')
// Must use explicit parser for standalone
const babylon = require('prettier/parser-babylon')

function prettify (raw) {
  return prettier.format(raw, { semi: true,
    parser: 'babel',
    plugins: [babylon]
  })
}

module.exports = prettify
