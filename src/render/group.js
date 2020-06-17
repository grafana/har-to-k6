const block = require('./block')
const comment = require('./comment')
const entries = require('./entries')
const string = require('./string')
const withSleep = require('./withSleep')

function group(spec) {
  if (spec.page) {
    const name = spec.page.name || spec.id
    let flow = [header(spec.page), body(name, spec)]

    if (spec.page.sleep) {
      flow = withSleep(flow, spec.page.sleep)
    }

    return flow.filter((item) => item).join(`\n`)
  } else {
    return body(spec.id, spec)
  }
}

function body(name, spec) {
  const content = [entries(spec.entries)]
  return `group(${string(name)}, function() ${block(content)});`
}

function header(page) {
  if (page.comment) {
    return comment(page.comment)
  } else {
    return null
  }
}

module.exports = group
