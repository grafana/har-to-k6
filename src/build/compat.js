const bundle = require('./bundle')
const indent = require('../render/indent')
const string = require('../render/string')

async function compat ({ imports }) {
  if (any(imports)) {
    const addend = analyze(imports)
    const entry = index(addend)
    return bundle(entry)
  } else {
    return null
  }
}

function any (imports) {
  return (
    imports.jsonpath ||
    imports.formUrlEncode ||
    imports.MimeBuilder
  )
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

function index (addend) {
  const entries = []
  for (const [ expose, name ] of addend.direct) {
    entries.push(`${expose}: require(${string(name)})`)
  }
  for (const [ expose, name ] of addend.indirect) {
    entries.push(`${expose}: require(${string(name)}).default`)
  }
  const content = entries.join(`,\n`)
  return '' +
`Object.assign(exports, {
${indent(content)}
})`
}

module.exports = compat
