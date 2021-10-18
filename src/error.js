class DetailedError extends Error {
  constructor(details, message) {
    super(typeof details === 'string' ? details : message)

    if (typeof details === 'object') {
      Object.assign(this, details)
    }
  }
}

class InvalidArchiveError extends DetailedError {}
class UnrecognizedError extends DetailedError {}

module.exports = {
  InvalidArchiveError,
  UnrecognizedError,
}
