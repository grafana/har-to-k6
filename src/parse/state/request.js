const address = require('./address')
const params = require('./params')
const post = require('./post')
const query = require('./query')

function request(spec) {
  query(spec)
  address(spec)
  post(spec)
  params(spec)
}

module.exports = request
