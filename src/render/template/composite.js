const content = require('./content')

function composite(items, delimiter = '') {
  return ['`', items.map((item) => content(item)).join(delimiter), '`'].join('')
}

module.exports = composite
