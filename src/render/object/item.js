const comment = require('../comment')
const key = require('./key')

function item (spec, last) {
  const note = (spec.comment ? comment(spec.comment) : null)
  return (
    (note && note.substring(0, 2) === '/*' ? `${note}\n` : '') +
    `${key(spec)}: ${spec.value}` +
    (last ? '' : ',') +
    (note && note.substring(0, 2) === '//' ? ` ${note}` : '')
  )
}

module.exports = item
