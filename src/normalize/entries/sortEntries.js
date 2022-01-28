const { SleepPlacement } = require('../../enum')
const { nanoid } = require('nanoid')

const MIN_SLEEP = 500

/**
 * Validate that archive has a list of entries that all have a `startedDateTime` property
 * @param {Entry[]} entries
 * @return {boolean}
 */
function areEntriesValid(entries) {
  return entries.every(entry => !!entry.startedDateTime)
}

/**
 *
 * @param {Entry[]} entries
 * @return {TimelineNode[]} timelineNodes
 */
function getTimeline(entries) {
  let timeline = []
  for (const entry of entries) {
    const { startedDateTime } = entry
    const node = { id: nanoid(), date: new Date(startedDateTime), entry }
    timeline.push(node)

    // Check if there is a reason to exit
    if (Number.isNaN(node.date.valueOf())) {
      return null
    }
  }

  return timeline.sort((nodeA, nodeB) => {
    return nodeA.date - nodeB.date
  })
}

/**
 *
 * @param {TimelineNode} node
 * @param {TimelineNode[]} timeline
 * @return {Array|boolean}
 */
function getSleep(node, timeline) {
  if (node.entry.sleep) {
    return false
  }

  const nextIndex = timeline.findIndex(item => item.id === node.id) + 1
  const nextNode = timeline[nextIndex]
  if (!nextNode) {
    return false
  }

  const offset = nextNode.date - node.date
  let milliseconds = 0
  if (offset) {
    milliseconds = Math.round(offset / 100) * 100 || null
  }

  if (milliseconds >= MIN_SLEEP) {
    return [{ [SleepPlacement.After]: milliseconds }]
  }

  return false
}

/**
 *
 * @param {TimelineNode[]} timeline
 * @param {{ addSleep?: boolean }} options
 * @return {Entry[]} entries
 */
function getEntries(timeline, options) {
  return timeline.map(node => {
    if (options.addSleep) {
      const sleep = getSleep(node, timeline)
      if (sleep) {
        return {
          ...node.entry,
          sleep,
        }
      }
    }

    return node.entry
  })
}

/**
 * Sorts archive entries by `startedDateTime` property
 * @param {Entry[]} entries
 * @param {{ addSleep?: boolean }} options
 * @return {Entry[]} entries
 */
function getSortedEntries(entries, options) {
  // Return entries if it doesn't pass validation
  if (!areEntriesValid(entries)) {
    return entries
  }

  const timeline = getTimeline(entries)

  // Return entries if timeline couldn't be created
  if (!timeline) {
    return entries
  }

  return getEntries(timeline, options)
}

module.exports = { getSortedEntries }
