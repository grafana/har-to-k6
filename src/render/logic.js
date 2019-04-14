const block = require('./block')
const external = require('./external')
const groups = require('./groups')

function logic (result) {
  const content = [
    external(result),
    groups(result)
  ].filter(item => item)
  return `export default function() ${block(content)}`
}

module.exports = logic
