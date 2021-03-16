const { SleepPlacement } = require('../enum')
const { DEFAULT_OPTIONS } = require('../constants')
const MIN_SLEEP = 500

/**
 * Validate archive without iterating nodes
 * @param {HAR} archive
 * @return {boolean}
 */
function isValidArchive(archive) {
  return !!archive && !!archive.log && !!archive.log.entries
}

function getDraft(archive) {
  const draft =
    typeof archive === 'string'
      ? JSON.parse(archive)
      : JSON.parse(JSON.stringify(archive))

  const { entries = [], ...log } = draft.log
  draft.log = log

  return [draft, entries]
}

/**
 *
 * @param {Entry[]} nodes
 * @return {TimelineRef[]}
 */
function getTimeline(nodes) {
  /**
   * @type {Timeline}
   */
  let timeline = []

  for (const node of nodes) {
    const { startedDateTime } = node
    const timelineRef = { date: new Date(startedDateTime) }

    // Add ref to timeline and attach reference to node
    timeline.push(timelineRef)
    node.timelineRef = timelineRef

    // Check if there is a reason to exit
    if (Number.isNaN(timelineRef.date.valueOf())) {
      return null
    }
  }

  return timeline.sort((refA, refB) => {
    return refA.date - refB.date
  })
}

function withSleep(node, timeline) {
  // Dont add sleep if sleep is truthy
  if (node.sleep) {
    return false
  }

  const nextIndex = timeline.indexOf(node.timelineRef) + 1
  const nextRef = timeline[nextIndex]
  if (!nextRef) {
    return false
  }

  const offset = nextRef.date - node.timelineRef.date
  let milliseconds = 0
  if (offset) {
    milliseconds = Math.round(offset / 10) * 10 || null
  }

  if (milliseconds >= MIN_SLEEP) {
    node.sleep = [{ [SleepPlacement.After]: milliseconds }]

    return true
  }

  return false
}

function cleanNode(node) {
  delete node.timelineRef
  return node
}

function getEntries(nodes, timeline, options) {
  return timeline.map((timelineRef) => {
    const node = nodes.find((node) => node.timelineRef === timelineRef)
    if (options.addSleep) {
      withSleep(node, timeline)
    }

    return cleanNode(node)
  })
}

/**
 *
 * @param {HAR} archive
 * @param {{addSleep?: boolean}} options
 * @return {HAR}
 */
function normalize(archive, options = DEFAULT_OPTIONS) {
  // Return input archive if it doesnt pass validation
  if (!isValidArchive(archive)) {
    return archive
  }

  const [draft, entries] = getDraft(archive)
  const timeline = getTimeline(entries)

  // Return input archive if timeline couldn't be created
  if (!timeline) {
    return archive
  }

  // Rebuild archive
  return {
    ...draft,
    log: {
      ...draft.log,
      entries: getEntries(entries, timeline, options),
    },
  }
}

module.exports = normalize
