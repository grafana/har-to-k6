const { DEFAULT_OPTIONS } = require('../constants')
const { doesArchiveHaveEntries, getNormalizedEntries } = require('./entries')

/**
 * Normalizes HAR archive
 * @param {HAR} archive
 * @param {{ addSleep?: boolean }} options
 * @returns {HAR} HAR archive
 */
function normalize(archive, options = DEFAULT_OPTIONS) {
  if (!doesArchiveHaveEntries(archive)) {
    return archive
  }

  const entries = getNormalizedEntries(archive.log.entries, options)

  return {
    ...archive,
    log: {
      ...archive.log,
      entries,
    },
  }
}

module.exports = normalize
