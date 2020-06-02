const comment = require('../comment')
const key = require('./key')
const { CommentLocation } = require('../../enum')
const { lineBreak, multilineComment } = require('../../expression')

function item(spec, last) {
  const note = spec.comment ? comment(spec.comment) : null
  const location = locate(spec, note)
  return (
    (note && location === CommentLocation.Top ? `${note}\n` : '') +
    `${key(spec.name)}: ${spec.value}` +
    (last ? '' : ',') +
    (note && location === CommentLocation.Suffix ? ` ${note}` : '')
  )
}

function locate(spec, note) {
  if (
    (note && multilineComment.test(note)) ||
    lineBreak.test(spec.value) ||
    2 + spec.name.length + 2 + spec.value.length > 50
  ) {
    /*
     * Any of:
     * - Comment multiline.
     * - Value multiline.
     * - Line long (>50 characters).
     */
    return CommentLocation.Top
  } else {
    /*
     * All of:
     * - Comment single line.
     * - Value single line.
     * - Line short (<=50 characters).
     */
    return CommentLocation.Suffix
  }
}

module.exports = item
