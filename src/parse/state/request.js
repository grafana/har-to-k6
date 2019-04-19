const address = require('./address')
const query = require('./query')

function request (spec) {
  query(spec)
  address(spec)
}

module.exports = request
