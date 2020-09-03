const absoluteUrl = /^([^:]+):\/\//
const lineBreak = /\n/
const lineComment = /^\/\//
const multilineComment = /^\/\*/
const multilineCommentEnds = /\*\//g
const variable = /\${([^}]*)}/
const variables = /\${([^}]*)}/g
const variableStart = /^\${([^}]*)}/

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
