const encode = require('form-urlencoded').default
const string = require('../../../string')

// Multivalue URL encoded post data without variable
function fixed (params) {
  const spec = specify(params)
  const encoded = encode(spec, { sorted: true })
  return string(encoded)
}

function specify (params) {
  const spec = {}
  for (const [ name, items ] of params) {
    if (items.size > 1) {
      spec[name] = [ ...items ].map(item => item.value)
    } else {
      spec[name] = [ ...items ][0].value
    }
  }
  return spec
}

module.exports = fixed
