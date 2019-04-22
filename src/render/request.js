const address = require('./address')
const cookies = require('./cookies')
const headers = require('./headers')
const indent = require('./indent')
const object = require('./object')
const post = require('./post')
const postMultipartResolvedPre = require('./post/multipart/resolved/pre')
const text = require('./text')
const { requestFactor: makeRequestFactor } = require('../make')
const { PostSpecies } = require('../enum')

function request (spec) {
  const factor = analyze(spec)
  return render(factor)
}

function analyze (spec) {
  const factor = makeRequestFactor()
  factor.method = method(spec)
  address(spec, factor)
  body(spec, factor)
  factor.headers = headers(spec.headers)
  factor.cookies = cookies(spec.cookies)
  factor.options = options(factor)
  return factor
}

function method (spec) {
  return text(spec.method)
}

function body (spec, factor) {
  factor.body = post(spec)
  if (
    spec.state.post.species === PostSpecies.Structured &&
    spec.post.type === 'multipart/form-data' &&
    spec.state.params.variable
  ) {
    // Prerequest MIME message construction
    factor.pre.push(postMultipartResolvedPre(spec.post.params))
  }
}

function options (factor) {
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

function render (factor) {
  return [
    pre(factor),
    main(factor)
  ].filter(item => item).join(`\n`)
}

function pre (factor) {
  if (factor.pre.length) {
    return factor.pre.join(`\n`)
  } else {
    return null
  }
}

function main (factor) {
  return execute(args(factor))
}

function args (factor) {
  const items = []
  items.push(factor.method)
  items.push(factor.address)
  if (factor.body) {
    items.push(factor.body)
  } else if (factor.options) {
    // Body argument placeholder necessary
    items.push(`null`)
  }
  if (factor.options) {
    items.push(factor.options)
  }
  return items
}

function execute (args) {
  if (compact(args)) {
    const list = args.join(`, `)
    return `response = http.request(${list});`
  } else {
    const list = args.join(`,\n`)
    return '' +
`response = http.request(
${indent(list)}
);`
  }
}

function compact (args) {
  return (
    args.length === 2 ||
    args[2] === 'null'
  )
}

module.exports = request
