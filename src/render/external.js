const entries = require('./entries')
const { ExternalScope } = require('../sym')

function external (result) {
  if (
    result.flow.length &&
    result.flow[0].id === ExternalScope &&
    result.flow[0].entries.length
  ) {
    return entries(result.flow[0].entries)
  } else {
    return null
  }
}

module.exports = external
