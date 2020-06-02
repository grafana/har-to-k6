const header = require('./header')
const logic = require('./logic')

function entry(spec) {
  return [header(spec), logic(spec)].filter((item) => item).join(`\n`)
}

module.exports = entry
