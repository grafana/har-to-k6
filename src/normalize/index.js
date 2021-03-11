const Normalizer = require('./Normalizer')
const { DEFAULT_OPTIONS } = require('../constants')

function normalize(archive, options = DEFAULT_OPTIONS) {
  if (archive) {
    const normalizer = new Normalizer(archive, options)
    return normalizer.getArchive()
  }

  return archive
}

module.exports = normalize
