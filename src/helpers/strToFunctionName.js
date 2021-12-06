const capitalize = require('./capitalize')
const { DEFAULT_FUNCTION_NAME } = require('../constants')

/** @see https://www.w3schools.com/js/js_reserved.asp */
const javascriptReservedWords = [
  'abstract',
  'arguments',
  'await',
  'boolean',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'double',
  'else',
  'enum',
  'eval',
  'export',
  'extends',
  'false',
  'final',
  'finally',
  'float',
  'for',
  'function',
  'goto',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'int',
  'interface',
  'let',
  'long',
  'native',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'short',
  'static',
  'super',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'volatile',
  'while',
  'with',
  'yield',
]

const k6ReservedWords = [
  // general
  'options',
  '__ITER',
  '__VU',
  'open',
  // k6
  'sleep',
  'check',
  'group',
  // k6/http
  'http',
  // jslib
  'jsonpath',
  'MimeBuilder',
  'FormData',
  'URL',
  'URLSearchParams',
]

const reservedWords = [...javascriptReservedWords, ...k6ReservedWords]

/**
 * Convert string to valid function name
 * @param {string} subject
 * @param {string} fallback Name to use if subject becomes an empty string (IMPORTANT: no validation is done for this value)
 * @returns {string}
 */
function strToFunctionName(subject = '', fallback = DEFAULT_FUNCTION_NAME) {
  const words = String(subject)
    .normalize('NFD')
    // didnt dare to use unicode property escapes
    // mainly because of older Edge versions
    .replace(/[\u0300-\u036f]/g, '')
    // convert camelCase into "words" so that proper names are not broken
    .replace(/([A-Z])/g, ' $1')
    .split(/\s/)
    .map(word => word.replace(/\W/g, ''))
    .filter(word => word)

  // camelCase capitalization
  const [firstWord = '', ...rest] = words
  const result =
    [firstWord.toLowerCase(), ...rest.map(word => capitalize(word))].join('') ||
    fallback

  return reservedWords.includes(result) ? `_${result}` : result
}

module.exports = strToFunctionName
