const group = require('./group')
const { ExternalScope } = require('../sym')

function groups (result) {
  if (result.flow.length) {
    const flow = [ ...result.flow ]
    if (flow[0].id === ExternalScope) {
      flow.shift()
    }
    const sections = flow.map(item => group(item))
    return sections.filter(item => item).join(`\n\n`)
  } else {
    return null
  }
}

module.exports = groups
