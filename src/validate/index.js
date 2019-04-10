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
  if (archive.log.entries) {
    entryIndex(archive.log.entries)
  }
}

module.exports = validate
