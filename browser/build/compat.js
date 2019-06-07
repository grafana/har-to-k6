const any = require('../../src/build/any')
const compats = require('../../build/compats.js')

async function compat ({ imports }) {
  if (any(imports)) {
    const index = mask(imports)
    return compats[index]
  } else {
    return null
  }
}

function mask (imports) {
  let result = 0
  if (imports.jsonpath) {
    result = result | 0b001
  }
  if (imports.MimeBuilder) {
    result = result | 0b100
  }
  return result
}

module.exports = compat
