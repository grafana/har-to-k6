/**
 * @typedef {{log: {pages?: Object[], entries: Object[]}}} HTTPArchive
 * @typedef {{log: {pages?: Object<{sleep?:[]|null}>[], entries: Object<{sleep?:[]|null}>[]}}} K6HTTPArchive
 * @typedef {{startedDateTime?: string, id?: string, pageref?: string}} HARNode
 * @typedef {{id?: string, pageRef?: string, date: Date}} TimelineRef
 */

const { SleepPlacement } = require('../enum')
const { DEFAULT_OPTIONS } = require('../constants')
const MIN_SLEEP = 500

/**
 * Validate archive without iterating nodes
 * @param {HTTPArchive} archive
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

  const { pages = [], entries = [], ...log } = draft.log
  draft.log = log

  return [draft, pages, entries]
}

/**
 *
 * @param {HARNode[]} nodes
 * @return {TimelineRef[]}
 */
function getTimeline(nodes) {
  let timeline = []

  for (const node of nodes) {
    const { id = '', pageref: pageRef = '', startedDateTime } = node
    const timelineRef = { id, pageRef, date: new Date(startedDateTime) }

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

function hasParent(timelineRef, parentRef = null) {
  if (parentRef) {
    return timelineRef.pageRef ? timelineRef.pageRef === parentRef.id : false
  }

  return !!timelineRef.pageRef
}

function isPage(timelineRef) {
  return timelineRef.id && !timelineRef.pageRef
}

function withSleep(node, timeline) {
  // Dont add sleep if sleep is truthy
  if (node.sleep) {
    return false
  }

  const precedingIndex = timeline.indexOf(node.timelineRef) - 1
  if (precedingIndex < 0) {
    return false
  }

  const precedingRef = timeline[precedingIndex]
  // Dont add sleep if preceding node is parent of current node
  if (hasParent(node.timelineRef, precedingRef)) {
    return false
  }

  const offset = node.timelineRef.date - precedingRef.date
  let milliseconds = 0
  if (offset) {
    milliseconds = Math.round(offset / 10) * 10 || null
  }

  if (milliseconds >= MIN_SLEEP) {
    node.sleep = [{ [SleepPlacement.Before]: milliseconds }]

    return true
  }

  return false
}

function cleanNode(node) {
  delete node.timelineRef
  return node
}

function getPages(nodes, timeline, options) {
  return timeline
    .filter((timelineRef) => isPage(timelineRef))
    .map((timelineRef) => {
      const node = nodes.find((node) => node.timelineRef === timelineRef)
      if (options.addSleep) {
        withSleep(node, timeline)
      }

      return cleanNode(node)
    })
}

function getEntries(nodes, timeline, options) {
  return timeline
    .filter((timelineRef) => !isPage(timelineRef))
    .map((timelineRef) => {
      const node = nodes.find((node) => node.timelineRef === timelineRef)
      if (options.addSleep) {
        withSleep(node, timeline)
      }

      return cleanNode(node)
    })
}

/**
 *
 * @param {HTTPArchive} archive
 * @param {{addSleep?: boolean}} options
 * @return {K6HTTPArchive}
 */
function normalize(archive, options = DEFAULT_OPTIONS) {
  // Return input archive if it doesnt pass validation
  if (!isValidArchive(archive)) {
    return archive
  }

  const [draft, pages, entries] = getDraft(archive)
  const timeline = getTimeline([...pages, ...entries])

  // Return input archive if timeline couldn't be created
  if (!timeline) {
    return archive
  }

  // Rebuild archive
  return {
    ...draft,
    log: {
      ...draft.log,
      pages: getPages(pages, timeline, options),
      entries: getEntries(entries, timeline, options),
    },
  }
}

module.exports = normalize
