const sort = require('../sort')
const { ExternalScope } = require('../sym')

// Resolve control flow
function flow (result) {
  const classes = classifyScopes(result.pages, result.scopes)
  orderScopes(result.pages, classes)
  const scopeFlow = flattenScopes(classes)
  const groups = groupEntries(result.scopes, scopeFlow)
  orderEntries(groups)
  result.flow.push(...groups)
}

function classifyScopes (pages, scopes) {
  const classes = {
    external: [],
    explicit: [],
    implicit: []
  }
  for (const key of scopes.keys()) {
    if (key === ExternalScope) {
      classes.external.push(key)
    } else if (pages.has(key)) {
      classes.explicit.push(key)
    } else {
      classes.implicit.push(key)
    }
  }
  return classes
}

function orderScopes (pages, classes) {
  classes.explicit.sort((a, b) => {
    a = pages.get(a).index
    b = pages.get(b).index
    return a > b ? 1 : a < b ? -1 : 0
  })
  classes.implicit.sort()
}

function flattenScopes (classes) {
  return [
    ...classes.external,
    ...classes.explicit,
    ...classes.implicit
  ]
}

function groupEntries (scopes, scopeFlow) {
  const groups = []
  for (const id of scopeFlow) {
    const scope = scopes.get(id)
    const group = {
      id,
      entries: [ ...scope ]
    }
    groups.push(group)
  }
  return groups
}

function orderEntries (groups) {
  for (const group of groups) {
    group.entries.sort(sort.index)
  }
}

module.exports = flow
