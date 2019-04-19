const cookies = require('./cookies')
const headers = require('./headers')
const postData = require('./postData')
const queryString = require('./queryString')
const state = require('./state/request')

function request (node, spec) {
  spec.method = node.method.toUpperCase()
  spec.address = node.url
  if (node.comment) {
    spec.comment = node.comment
  }
  if (node.queryString) {
    queryString(node.queryString, spec.query)
  }
  if (node.headers) {
    headers(node.headers, spec.headers)
  }
  if (node.cookies) {
    cookies(node.cookies, spec.cookies)
  }
  if (node.postData) {
    postData(node.postData, spec.post)
  }
  state(spec)
}

module.exports = request
