const { SleepPlacement } = require('../enum')
const { isObject } = require('../aid')

function sleep(node) {
  return node.map(sleepItem)
}

function sleepItem(node) {
  return isObject(node) ? node : { [SleepPlacement.After]: node }
}

module.exports = sleep
