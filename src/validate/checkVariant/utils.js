const { createChecksIndexes } = require('../utils/indexes')
const { createChecksPath } = require('../utils/path')

function createErrorParamsForCheckVariants({
  name,
  indexes: [entryIndex, checkIndex],
  path = '',
}) {
  return {
    name,
    path: createChecksPath(entryIndex, checkIndex, path),
    indexes: createChecksIndexes(entryIndex, checkIndex),
  }
}

module.exports = createErrorParamsForCheckVariants
