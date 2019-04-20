const content = require('./content')

function composite (items) {
  return [
    '`',
    items
      .map(item => content(item))
      .join(', '),
    '`'
  ].join('')
}

module.exports = composite
