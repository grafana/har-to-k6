const stages = require('./stages')


function options (node, result) {
  if (node.stages) {
    stages(node.stages, result.options)
  }

  if (node.duration) {
    result.options.set('duration', node.duration)
  }

  if (node.vus) {
    result.options.set('vus', node.vus)
  }
}

module.exports = options
