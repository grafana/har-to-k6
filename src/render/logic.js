const block = require('./block')
const declares = require('./declares')
const external = require('./external')
const groups = require('./groups')
const variableSpace = require('./variableSpace')

function logic (result) {
  const content = [
    declares(result.declares),
    variableSpace(result),
    external(result),
    groups(result)
  ].filter(item => item)
  return `export default function() ${block(content)}`
}

module.exports = logic
