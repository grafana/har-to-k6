const text = require('./text')

function cookie(name, spec) {
  return {
    name,
    value: value(spec),
    comment: note(spec),
  }
}

function value(spec) {
  return text(spec.value || '')
}

function note(spec) {
  return spec.comment || null
}

module.exports = cookie
