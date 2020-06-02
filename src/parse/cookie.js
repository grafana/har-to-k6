const format = require('../format')
const moment = require('moment')

function cookie(node, spec) {
  const item = {}
  if (node.value) {
    item.value = node.value
  }
  if (node.path) {
    item.path = node.path
  }
  if (node.domain) {
    item.domain = node.domain
  }
  if (node.expires) {
    expires(node.expires, item)
  }
  if (typeof node.httpOnly === 'boolean') {
    item.httpOnly = node.httpOnly
  }
  if (typeof node.secure === 'boolean') {
    item.secure = node.secure
  }
  if (node.comment) {
    item.comment = node.comment
  }
  spec.set(node.name, item)
}

function expires(value, item) {
  const time = moment(value, moment.ISO_8601)
  time.utc()
  item.expires = format.date.http(time)
}

module.exports = cookie
