const encode = require('form-urlencoded').default

// Multivalue URL encoded post data without variable
function fixed (params) {
  const spec = specify(params)
  return encode(spec, { sorted: true })
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
