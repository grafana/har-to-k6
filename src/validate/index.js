const entryIndex = require('./entryIndex')
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
  if (archive.log && archive.log.entries) {
    entryIndex(archive)
  }
}

module.exports = validate
