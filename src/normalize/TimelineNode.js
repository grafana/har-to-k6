const { nanoid } = require('nanoid')

class TimelineNode {
  constructor({
    id: pageId = '',
    pageref: pageRef = '',
    startedDateTime = '',
  }) {
    this.id = nanoid()
    this.pageId = pageId
    this.pageRef = pageRef
    this.startedDateTime = startedDateTime ? new Date(startedDateTime) : null
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

module.exports = TimelineNode
