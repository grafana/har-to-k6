const block = require('./block')
const comment = require('./comment')
const entries = require('./entries')
const string = require('./string')

function group(spec) {
  if (spec.page) {
    const name = spec.page.name || spec.id
    const content = [entries(spec.entries)]
    return [header(spec.page), `group(${string(name)}, function() ${block(content)});`]
      .filter((item) => item)
      .join(`\n`)
  } else {
    const name = spec.id
    const content = [entries(spec.entries)]
    return `group(${string(name)}, function() ${block(content)});`
  }
}

function header(page) {
  if (page.comment) {
    return comment(page.comment)
  } else {
    return null
  }
}

module.exports = group
