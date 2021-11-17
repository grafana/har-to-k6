const absoluteUrl = /^([^:]+):\/\//
const lineBreak = /\n/
const lineComment = /^\/\//
const multilineComment = /^\/\*/
const multilineCommentEnds = /\*\//g
const variable = /\${([^}\r\n\t\f\v]*)}/
const variables = /\${([^}\r\n\t\f\v]*)}/g
const variableStart = /^\${([^}\r\n\t\f\v]*)}/

module.exports = {
  absoluteUrl,
  lineBreak,
  lineComment,
  multilineComment,
  multilineCommentEnds,
  variable,
  variables,
  variableStart,
}
