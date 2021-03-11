const { SleepPlacement } = require('../enum')
const { MIN_SLEEP } = require('./constants')

function createSleep(milliseconds) {
  let sleepAmount
  if (milliseconds) {
    sleepAmount = Math.round(milliseconds / 10) * 10 || null
  }

  if (sleepAmount >= MIN_SLEEP) {
    return [{ [SleepPlacement.Before]: sleepAmount }]
  }

  return null
}

function getSleepByTimeline(timelineNode, timeline) {
  const index = timeline.indexOf(timelineNode)
  if (index) {
    const before = timeline[index - 1]
    if (before && !timelineNode.hasParent(before)) {
      return createSleep(timelineNode.startedDateTime - before.startedDateTime)
    }
  }

  return null
}

module.exports = getSleepByTimeline
