const address = require('./address')
const post = require('./post')
const query = require('./query')

function request (spec) {
  query(spec)
  address(spec)
  post(spec)
}

module.exports = request
