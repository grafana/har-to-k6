// Use standalone for browser compatibility
const prettier = require('prettier/standalone')
const babelParser = require('prettier/parser-babel')

function prettify(raw) {
  return prettier.format(raw, {
    semi: false,
    arrowParens: 'avoid',
    parser: 'babel',
    plugins: [babelParser],
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
  })
}

module.exports = prettify
