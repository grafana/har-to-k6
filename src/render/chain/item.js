const comment = require('../comment')
const { lineComment, multilineComment } = require('../../expression')

function item(spec) {
  const note = spec.comment ? comment(spec.comment) : null
  return (
    (note && multilineComment.test(note) ? `${note}\n` : '') +
    `.${spec.call}` +
    (note && lineComment.test(note) ? ` ${note}` : '')
  )
}

module.exports = item
