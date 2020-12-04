const queryItem = require('./queryItem')

function queryString(node, requestUrl, spec) {
  // Filter out value pairs that are already in the request
  // Using base url, since url may be invalid (variable instead protocol)
  const url = new URL(requestUrl, 'https://test.k6.io')
  const items = node.filter(({ name, value }) => {
    // decode URI before comparing, since searchParam will hold decoded values
    return url.searchParams.get(name) !== decodeURIComponent(value)
  })

  for (const item of items) {
    queryItem(item, spec)
  }
}

module.exports = queryString
