const cookies = require('./cookies')
const headers = require('./headers')
const postData = require('./postData')
const queryString = require('./queryString')
const { variable, variableStart } = require('../expression')

function request (node, spec) {
  spec.method = node.method.toUpperCase()
  address(node, spec)
  if (node.comment) {
    spec.comment = node.comment
  }
  if (node.queryString) {
    queryString(node.queryString, spec.query, spec.state.query)
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
}

function address (node, spec) {
  spec.address = node.url
  spec.state.address.variable = variable.test(spec.address)
  spec.state.address.variableStart = variableStart.test(spec.address)
}

module.exports = request
