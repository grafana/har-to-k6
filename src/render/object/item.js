const comment = require('../comment')
const key = require('./key')
const { lineComment, multilineComment } = require('../../expression')

function item (spec, last) {
  const note = (spec.comment ? comment(spec.comment) : null)
  return (
    (note && multilineComment.test(note) ? `${note}\n` : '') +
    `${key(spec)}: ${spec.value}` +
    (last ? '' : ',') +
    (note && lineComment.test(note) ? ` ${note}` : '')
  )
}

module.exports = item
