// Use standalone for browser compatibility
const prettier = require('prettier/standalone')
const babelParser = require('prettier/parser-babel')

function prettify(raw) {
  return prettier.format(raw, {
    semi: true,
    arrowParens: 'avoid',
    parser: 'babel',
    plugins: [babelParser],
  })
}

module.exports = prettify
