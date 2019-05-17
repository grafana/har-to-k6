const stage = require('./stage')


function stages(node, result) {
  result.set('stages', node.map(stage))
}

module.exports = stages
