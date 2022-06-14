class HarToK6Error extends Error {
  constructor(details, message) {
    super(typeof details === 'string' ? details : message)

    if (typeof details === 'object') {
      Object.assign(this, details)
    }
  }
}

class InvalidArchiveError extends HarToK6Error {
  constructor({ name = '', path = '', indexes = [] }, message) {
    super({ name, path, indexes }, message)
  }
}

class UnrecognizedError extends HarToK6Error {}

module.exports = {
  HarToK6Error,
  InvalidArchiveError,
  UnrecognizedError,
}
