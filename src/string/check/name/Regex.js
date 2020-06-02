const subject = require('../subject')

function Regex(node) {
  return [subject(node.subject), 'matches', expression(node)].join(' ')
}

function expression(node) {
  return `/${node.expression}/${node.flags || ''}`
}

module.exports = Regex
