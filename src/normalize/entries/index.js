const { getDecodedPostDataParamEntries } = require('./decodePostDataParams')
const { getSortedEntries } = require('./sortEntries')

/**
 * Validate whether archive has `entries` property
 * @param {HAR} archive
 * @return {boolean} If true `entries` property is present
 */
function doesArchiveHaveEntries(archive) {
  return !!archive && !!archive.log && !!archive.log.entries
}

/**
 * Normalizes archive entries
 * @param {Entry[]} entries
 * @param {{ addSleep?: boolean }} options
 * @returns {Entry[]} entries
 */
function getNormalizedEntries(entries, options) {
  const sortedEntries = getSortedEntries(entries, options)
  return getDecodedPostDataParamEntries(sortedEntries)
}

module.exports = { doesArchiveHaveEntries, getNormalizedEntries }
