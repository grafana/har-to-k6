const { SleepPlacement } = require('./enum')
const { nanoid } = require('nanoid')

const MIN_SLEEP = 500 // milliseconds

class TimingNode {
  constructor({
    id: pageId = '',
    pageref: pageRef = '',
    startedDateTime = '',
  }) {
    this.id = nanoid()
    this.pageId = pageId
    this.pageRef = pageRef
    this.startedDateTime = new Date(startedDateTime)
  }

  /**
   * Whether or not timing node is a page
   * @return {boolean}
   */
  isPage() {
    return this.pageId && !this.pageRef
  }

  /**
   * Returns whether or not timing node has a parent or if supplied parent is
   * parent of this node
   * @param {TimingNode} [parent]
   * @return {boolean}
   */
  hasParent(parent = null) {
    if (parent) {
      return this.hasParent() ? this.pageRef === parent.pageId : false
    }

    return !!this.pageRef
  }
}

class Timings {
  static sortStartDateTimeString(nodeA, nodeB) {
    const dateA = new Date(nodeA.startedDateTime)
    const dateB = new Date(nodeB.startedDateTime)

    return dateA - dateB
  }

  static sortStartDateTimeDate(nodeA, nodeB) {
    return nodeA.startedDateTime - nodeB.startedDateTime
  }

  constructor(pages = [], entries = []) {
    this.pages = pages
    this.entries = entries
    this.timeline = []
    this.sorted = false

    this.addSleep = this.addSleep.bind(this)

    // Sort and add timing nodes
    this.createTimingNodes(this.pages)
    this.createTimingNodes(this.entries)
  }

  /**
   * @param {{startedDateTime: string, id?: string, pageref?: string, timingNodeId?: string}} node
   */
  createTimingNode(node) {
    const timingNode = new TimingNode(node)
    // Add (mutate) the input node to have a timingNodeId
    node.timingNodeId = timingNode.id

    this.timeline.push(timingNode)
    this.sorted = false
    this.finalized = false
  }

  /**
   * Add list of pages/entries
   * @param {{startedDateTime: string, id?: string, pageref?: string}[]} nodeList
   */
  createTimingNodes(nodeList = []) {
    // Sort node list based on started date time
    nodeList.sort(TimingNode.sortStartDateTimeString)
    nodeList.forEach((node) => this.createTimingNode(node))
  }

  sort() {
    this.sorted || this.timeline.sort(Timings.sortStartDateTimeDate)
    return this
  }

  getNodeTimeline({ timingNodeId = null, startedDateTime = null }) {
    this.sort()
    const exitAfter = startedDateTime ? new Date(startedDateTime) : false
    if (timingNodeId) {
      for (
        let index = 0, length = this.timeline.length;
        index < length;
        index += 1
      ) {
        if (this.timeline[index].id === timingNodeId) {
          return [this.timeline[index], this.timeline[index - 1] || null]
        }

        // Exit loop as soon as possible
        if (exitAfter && this.timeline[index].startedDateTime > exitAfter) {
          break
        }
      }
    }

    return [null, null]
  }

  roundSleep(milliseconds) {
    if (milliseconds) {
      return Math.round(milliseconds / 10) * 10 || null
    }

    return null
  }

  getSleep(
    { startedDateTime: date = null },
    { startedDateTime: precedingDate = null }
  ) {
    const sleepAmount = this.roundSleep(date - precedingDate)
    if (sleepAmount >= MIN_SLEEP) {
      return [{ [SleepPlacement.Before]: sleepAmount }]
    }

    return null
  }

  addSleep(node) {
    if (!node.sleep) {
      const [timing, precedingTiming] = this.getNodeTimeline(node)
      const isFirstChild = timing.hasParent(precedingTiming)
      if (timing && precedingTiming && !isFirstChild) {
        const sleep = this.getSleep(timing, precedingTiming)
        if (sleep) {
          node.sleep = sleep
        }
      }
    }

    delete node.timingNodeId

    return node
  }

  finalize() {
    if (!this.finalized) {
      this.pages = this.pages.map(this.addSleep)
      this.entries = this.entries.map(this.addSleep)
      this.finalized = true
    }
    return this
  }

  getPages() {
    this.finalize().page
  }

  getEntries() {
    this.finalize().entries
  }
}

function addSleep(archive) {
  // Create copy of archive
  const har = JSON.parse(JSON.stringify(archive))
  const { log } = har
  if (!log || !log.pages || !log.entries) {
    return har
  }

  const { pages, entries } = log
  const timings = new Timings(pages, entries)

  return {
    ...har,
    logs: {
      ...log,
      pages: timings.getPages(),
      entries: timings.getEntries(),
    },
  }
}

module.exports = addSleep
