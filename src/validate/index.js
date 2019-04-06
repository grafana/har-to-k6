const root = require('./root')

/**
 * Validate LI-HAR archive
 *
 * @return {undefined} If valid.
 * @throws {InvalidArchiveError} If invalid.
 */
function validate (archive) {
  root(archive)
}

module.exports = validate
