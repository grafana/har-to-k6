function any(imports) {
  return imports.jsonpath || imports.formUrlEncode || imports.MimeBuilder
}

module.exports = any
