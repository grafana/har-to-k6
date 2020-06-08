const { SleepPlacement } = require('../enum')
const { isObject } = require('../aid')

function sleep(node) {
  return isObject(node) ? node : { [SleepPlacement.After]: node }
}

module.exports = sleep
