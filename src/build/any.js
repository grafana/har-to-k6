function any (imports) {
  return (
    imports.jsonpath ||
    imports.MimeBuilder
  )
}

module.exports = any
