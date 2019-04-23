const cookies = require('./cookies')
const headers = require('./headers')
const postData = require('./postData')
const queryString = require('./queryString')
const state = require('./state/request')
const { emptyObject } = require('../aid')

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
  if (node.postData && !emptyObject(node.postData)) {
    postData(node.postData, spec.post)
    contentType(node.postData.mimeType, spec.headers)
  }
  state(spec)
}

// Fallback to content type from postData
// Preserves explicit header which potentially has more information
function contentType (mimeType, headers) {
  if (!headers.has('Content-Type')) {
    const item = { value: mimeType }
    const items = new Set([ item ])
    headers.set('Content-Type', items)
  }
}

module.exports = request
