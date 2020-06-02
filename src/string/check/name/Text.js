const condition = require('../condition')
const subject = require('../subject')

function Text(node) {
  return [subject(node.subject), condition(node.condition), node.value].join(' ')
}

module.exports = Text
