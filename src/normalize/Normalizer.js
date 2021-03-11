const TimelineNode = require('./TimelineNode')
const getSleepByTimeline = require('./getSleepByTimeline')
const { DEFAULT_OPTIONS } = require('../constants')
const { sortStartDateTimeDate } = require('./sort')

/**
 * Normalize HAR
 * Note: If any page/entry is missing startedDateTime property, hardly nothing
 * will differ from the input HAR.
 */
class Normalizer {
  /**
   * @param {string|Object} archive HAR archive
   * @param {{addSleep?: boolean}} options
   */
  constructor(archive, options = DEFAULT_OPTIONS) {
    this.options = options
    this.timeline = []

    // Create copy of HTTP Archive
    const [draft, pages, entries] = this.split(archive)
    this.draft = draft
    this.pages = pages
    this.entries = entries

    this.normalize()
  }

  /**
   * Normalize HAR
   */
  normalize() {
    this.createTimeline()
    this.finalize()
  }

  /**
   * Finalize node
   * @param node
   * @return {Pick<*, Exclude<keyof *, "timelineNode">>}
   */
  finalizeNode(node) {
    const { timelineNode, ...draft } = node
    const { addSleep } = this.options

    // Add `sleep()` before node
    if (addSleep) {
      this.addSleepToDraft(draft, timelineNode)
    }

    return draft
  }

  addSleepToDraft(draft, timelineNode) {
    if (timelineNode) {
      const sleep = getSleepByTimeline(timelineNode, this.timeline)
      if (sleep) {
        draft.sleep = sleep
      }
    }
  }

  /**
   * Get finalized node based on timeline reference (timelineNode)
   * @param timelineNode
   * @return {Pick<*, Exclude<keyof *, "timelineNode">>|null}
   */
  getFinalNodeByTimeline(timelineNode) {
    if (!this.timeline) {
      return null
    }

    const list = timelineNode.isPage() ? this.pages : this.entries

    const node = list.find((node) => node.timelineNode === timelineNode) || null
    if (!node) {
      return null
    }

    return this.finalizeNode(node)
  }

  /**
   * Finalize normalization and/or clean up
   */
  finalize() {
    // Finalize nodes if there is a timeline
    if (this.timeline) {
      this.pages = this.timeline
        .filter((node) => node.isPage())
        .map((node) => this.getFinalNodeByTimeline(node))

      this.entries = this.timeline
        .filter((node) => !node.isPage())
        .map((node) => this.getFinalNodeByTimeline(node))

      // Unset timeline
      this.timeline = null
    } else {
      // Clean up if there is no timeline
      this.pages = this.pages.map((node) => {
        delete node.timelineNode
        return node
      })

      this.entries = this.entries.map((node) => {
        delete node.timelineNode
        return node
      })
    }
  }

  /**
   * Create timeline and timeline reference for each node (page/entry)
   * Note: timeline is sorted by startDateTime
   */
  createTimeline() {
    // Collect all nodes (pages/entries)
    const nodes = [...this.pages, ...this.entries]

    // Iterate every node until done or reason for exiting early
    for (let index = 0, length = nodes.length; index < length; index += 1) {
      const node = nodes[index]
      const timelineNode = new TimelineNode(node)

      // Check if there is a reason to exit
      if (!timelineNode.startedDateTime) {
        // Discard timeline and exit loop
        this.timeline = null
        break
      }

      this.timeline.push(timelineNode)

      // Store reference in timeline
      // Any reference will be removed after Normalizer.finalize has been called
      node.timelineNode = timelineNode
    }

    // Sort timeline by startDateTime (Date) unless timeline is falsy
    if (this.timeline) {
      this.timeline.sort(sortStartDateTimeDate)
    }
  }

  /**
   * Split archive into archive (without pages and entries), pages, entries
   * @param archive
   * @return {[]}
   */
  split(archive) {
    const draft =
      typeof archive === 'string'
        ? JSON.parse(archive)
        : JSON.parse(JSON.stringify(archive))

    const { pages = [], entries = [], ...log } = draft.log
    draft.log = log

    return [draft, pages, entries]
  }

  /**
   * Returns a normalized copy of archive supplied to constructor
   * @return {*}
   */
  getArchive() {
    return {
      ...this.draft,
      log: {
        ...this.draft.log,
        pages: this.pages,
        entries: this.entries,
      },
    }
  }
}

module.exports = Normalizer
