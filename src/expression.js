const lineBreak = /\n/
const multilineCommentEnds = /\*\//g
const variable = /\${([^}]*)}/
const variables = /\${([^}]*)}/g

Object.assign(exports, {
  lineBreak,
  multilineCommentEnds,
  variable,
  variables
})
