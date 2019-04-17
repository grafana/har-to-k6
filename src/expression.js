const absoluteUrl = /^([^:])+:\/\//
const lineBreak = /\n/
const multilineCommentEnds = /\*\//g
const variable = /\${([^}]*)}/
const variables = /\${([^}]*)}/g
const variableStart = /^\${([^}])*}/

Object.assign(exports, {
  absoluteUrl,
  lineBreak,
  multilineCommentEnds,
  variable,
  variables,
  variableStart
})
