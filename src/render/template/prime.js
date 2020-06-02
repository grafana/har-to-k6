const content = require('./content')

function prime(value) {
  return `\`${content(value)}\``
}

module.exports = prime
