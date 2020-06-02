const evaluate = require('../evaluate')

function content(value) {
  return value.replace(/[\\`]|\$(?!{)|\${(?=[^}]*$)|\${([^}]*)}/g, replace)
}

function replace(match) {
  if (match[0] === '\\') {
    // Escape
    return '\\\\'
  } else if (match[0] === '`') {
    // Backtick
    return '\\`'
  } else if (match[match.length - 1] === '}') {
    // Variable
    const name = arguments[1]
    return `\${${evaluate(name)}}`
  } else if (match[1] === '{') {
    // Unterminated variable
    return '\\${'
  } else {
    // Nonvariable dollar sign
    return '\\$'
  }
}

module.exports = content
