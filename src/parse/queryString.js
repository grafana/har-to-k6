const queryItem = require('./queryItem')

function queryString(node, requestUrl, spec) {
  // Filter out value pairs that are already in the request
  // Using base url, since url may be invalid (variable instead protocol)
  const url = new URL(requestUrl, 'https://test.k6.io')
  const items = node.filter(({ name, value }) => {
    // no longer decode value as it's already decoded and if it contains % it breaks
    return url.searchParams.get(name) !== value
  })

  for (const item of items) {
    queryItem(item, spec)
  }
}

module.exports = queryString
