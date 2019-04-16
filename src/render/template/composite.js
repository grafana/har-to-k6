const content = require('./content')

function composite (items) {
  return [
    '`',
    items
      .filter(item => item)
      .map(item => content(item))
      .join(', '),
    '`'
  ].join('')
}

module.exports = composite
