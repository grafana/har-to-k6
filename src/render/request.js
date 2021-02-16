const address = require('./address')
const cookies = require('./cookies')
const headers = require('./headers')
const indent = require('./indent')
const object = require('./object')
const post = require('./post')
const text = require('./text')
const generateMultipartFixedPre = require('./post/multipart/fixed/pre')
const { requestFactor: makeRequestFactor } = require('../make')
const { PostSpecies } = require('../enum')

function request(spec) {
  const factor = analyze(spec)
  return render(factor)
}

function analyze(spec) {
  const factor = makeRequestFactor()
  factor.call = call(spec)
  factor.method = method(spec)
  factor.capacity = capacity(spec)
  address(spec, factor)
  body(spec, factor)
  factor.headers = headers(spec.headers)
  factor.cookies = cookies(spec.cookies)
  factor.options = options(factor)
  factor.args = args(factor)
  factor.compact = compact(factor)
  return factor
}

function call(spec) {
  if (shortcut.has(spec.method)) {
    return shortcut.get(spec.method)
  } else {
    return 'request'
  }
}

function method(spec) {
  return text(spec.method)
}

function capacity(spec) {
  return spec.method !== 'GET'
}

function body(spec, factor) {
  factor.body = post(spec)

  const isStructured = spec.state.post.species === PostSpecies.Structured
  const isMultipartFormData = (spec.post.type || '').includes(
    'multipart/form-data'
  )
  const hasVariables = !!spec.state.params.variable

  if (isStructured && isMultipartFormData) {
    // Pre-request logic for fixed multipart/form-data
    if (!hasVariables) {
      factor.pre.push(
        generateMultipartFixedPre(spec.post.params, spec.state.post.boundary)
      )
    }
  }
}

function options(factor) {
  if (factor.headers || factor.cookies) {
    const entries = []
    if (factor.headers) {
      entries.push({ name: 'headers', value: factor.headers })
    }
    if (factor.cookies) {
      entries.push({ name: 'cookies', value: factor.cookies })
    }
    return object(entries)
  } else {
    return null
  }
}

function args(factor) {
  const items = []
  if (factor.call === 'request') {
    items.push(factor.method)
  }
  items.push(factor.address)
  if (factor.body) {
    items.push(factor.body)
  } else if (factor.capacity && factor.options) {
    // Body argument placeholder necessary
    items.push(`null`)
  }
  if (factor.options) {
    items.push(factor.options)
  }
  return items
}

function compact(factor) {
  return (
    !factor.capacity || factor.args.length === 1 || factor.args[1] === 'null'
  )
}

function render(factor) {
  return [pre(factor), main(factor)].filter((item) => item).join(`\n`)
}

function pre(factor) {
  if (factor.pre.length) {
    return factor.pre.join(`\n`)
  } else {
    return null
  }
}

function main(factor) {
  if (factor.compact) {
    const list = factor.args.join(`, `)
    return `response = http.${factor.call}(${list});`
  } else {
    const list = factor.args.join(`,\n`)
    return (
      '' +
      `response = http.${factor.call}(
${indent(list)}
);`
    )
  }
}

// HTTP method to k6 shortcut method
const shortcut = new Map()
  .set('DELETE', 'del')
  .set('GET', 'get')
  .set('OPTIONS', 'options')
  .set('PATCH', 'patch')
  .set('POST', 'post')
  .set('PUT', 'put')

module.exports = request
