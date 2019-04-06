const root = require('./root')
const { makeAssay } = require('../aid')

/**
 * Validate LI-HAR archive
 *
 * @return {undefined} If valid.
 * @throws {InvalidArchiveError} If invalid.
 */
function validate (archive) {
  root(archive, makeAssay())
}

module.exports = validate
