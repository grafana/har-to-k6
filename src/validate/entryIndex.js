const { ExternalScope } = require('../sym')
const { InvalidArchiveError } = require('../error')

function entryIndex (entries) {
  const scopes = new Map()
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const scope = selectScope(scopes, entry)
    validate(scope, i, entry.index)
    scope.add(entry.index)
  }
}

function selectScope (scopes, entry) {
  const key = entry.pageref || ExternalScope
  if (!scopes.has(key)) {
    scopes.set(key, new Set())
  }
  return scopes.get(key)
}

function validate (scope, i, index) {
  if (scope.has(index)) {
    throw new InvalidArchiveError(
      { name: 'DuplicateEntryIndex' },
      `Duplicate entry index (${i}): ${index}`
    )
  }
}

module.exports = entryIndex
