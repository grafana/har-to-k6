const { VError } = require('verror')

class HarToK6Error extends VError {}
class InvalidArchiveError extends HarToK6Error {}

Object.assign(exports, {
  HarToK6Error,
  InvalidArchiveError
})
