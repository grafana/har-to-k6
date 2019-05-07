const any = require('./any')
const bundle = require('./bundle')
const entry = require('./entry')

async function compat ({ imports }) {
  if (any(imports)) {
    const addend = analyze(imports)
    const index = entry(addend)
    return bundle(index)
  } else {
    return null
  }
}

function analyze (imports) {
  return {
    direct: direct(imports),
    indirect: indirect(imports)
  }
}

function direct (imports) {
  const addend = new Map()
  if (imports.jsonpath) {
    addend.set('jsonpath', 'jsonpath')
  }
  return addend
}

function indirect (imports) {
  const addend = new Map()
  if (imports.formUrlEncode) {
    addend.set('formUrlEncode', 'form-urlencoded')
  }
  if (imports.MimeBuilder) {
    addend.set('MimeBuilder', 'emailjs-mime-builder')
  }
  return addend
}

module.exports = compat
