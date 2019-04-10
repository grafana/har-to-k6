const sort = require('../sort')
const { InvalidArchiveError } = require('../error')

/*
 * url: variables defined
 * queryItem name: variables defined
 * queryItem value: variables defined
 * header value: variables defined
 * cookie name: variables defined
 * cookie value: variables defined
 * cookie path: variables defined
 * cookie domain: variables defined
 * postData text: variables defined
 * param name: variables defined
 * param value: variables defined
 * param fileName: variables defined
 * param contentType: variables defined
 */
function variableDefined (archive) {
  const entries = orderEntries(archive)
  const defined = new Set()
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    validate(entry.request, i, defined)
    define(entry, defined)
  }
}

function validate (request, i, defined) {
  validateString(request.url, i, null, defined, 'Request URL')
  queryString(request.queryString, i, defined)
  headers(request.headers, i, defined)
  cookies(request.cookies, i, defined)
  postData(request.postData, i, defined)
}

function validateString (value, i, j, defined, property) {
  for (const name of referenced(value)) {
    if (!defined.has(name)) {
      const index = `${i}${j !== null ? `:${j}` : ''}`
      throw new InvalidArchiveError(
        { name: 'UndefinedVariable' },
        `${property} referenced undefined variable (${index}): ${name}`
      )
    }
  }
}

function queryString (node, i, defined) {
  if (node) {
    for (let j = 0; j < node.length; j++) {
      const queryItem = node[j]
      validateString(queryItem.name, i, j, defined, 'Query item name')
      validateString(queryItem.value, i, j, defined, 'Query item value')
    }
  }
}

function headers (node, i, defined) {
  if (node) {
    for (let j = 0; j < node.length; j++) {
      const header = node[j]
      validateString(header.value, i, j, defined, 'Header value')
    }
  }
}

function cookies (node, i, defined) {
  if (node) {
    for (let j = 0; j < node.length; j++) {
      const cookie = node[j]
      validateString(cookie.name, i, j, defined, 'Cookie name')
      validateString(cookie.value, i, j, defined, 'Cookie value')
      validateString(cookie.path, i, j, defined, 'Cookie path')
      validateString(cookie.domain, i, j, defined, 'Cookie domain')
    }
  }
}

function postData (node, i, defined) {
  if (node) {
    validateString(node.text, i, null, defined, 'Post text')
    params(node.params, i, defined)
  }
}

function params (node, i, defined) {
  if (node) {
    for (let j = 0; j < node.length; j++) {
      const param = node[j]
      validateString(param.name, i, j, defined, 'Param name')
      validateString(param.value, i, j, defined, 'Param value')
      validateString(param.fileName, i, j, defined, 'Param file name')
      validateString(param.contentType, i, j, defined, 'Param type')
    }
  }
}

function referenced (string) {
  if (string) {
    return matchVariables(string).map(match => match[1])
  } else {
    return []
  }
}

const variables = /\${([^}]+)}/g
function matchVariables (string) {
  const matches = []
  let match
  while ((match = variables.exec(string)) !== null) {
    matches.push(match)
  }
  variables.lastIndex = 0
  return matches
}

function define (entry, defined) {
  if (entry.variables) {
    for (const variable of entry.variables) {
      defined.add(variable.name)
    }
  }
}

function orderEntries (archive) {
  const pages = extractPages(archive.log.pages)
  const entries = archive.log.entries || []
  const external = entries.filter(entry => !entry.pageref).sort(sort.index)
  const explicit = orderExplicit(entries, pages)
  const implicit = orderImplicit(entries, pages)
  return [ ...external, ...explicit, ...implicit ]
}

function extractPages (pages) {
  if (pages) {
    return new Map(pages.map(page => [ page.id, page.index ]))
  } else {
    return new Map()
  }
}

function orderExplicit (entries, pages) {
  const unordered = entries.filter(entry => pages.has(entry.pageref))
  const groups = groupEntries(unordered)
  const orderedGroups = orderGroupsByIndex(groups, pages)
  return expand(orderedGroups)
}

function orderImplicit (entries, pages) {
  const unordered = entries
    .filter(entry => entry.pageref && !pages.has(entry.pageref))
  const groups = groupEntries(unordered)
  const orderedGroups = orderGroupsByName(groups)
  return expand(orderedGroups)
}

function groupEntries (entries) {
  const groups = new Map()
  for (const entry of entries) {
    if (!groups.has(entry.pageref)) {
      groups.set(entry.pageref, [])
    }
    groups.get(entry.pageref).push(entry)
  }
  for (const scopedEntries of groups.values()) {
    scopedEntries.sort(sort.index)
  }
  return groups
}

function orderGroupsByIndex (groups, pages) {
  return [ ...groups ]
    .map(group => [ pages.get(group[0]), group[1] ])
    .sort(sort.firstElement)
    .map(group => group[1])
}

function orderGroupsByName (groups) {
  return [ ...groups ]
    .sort(sort.firstElement)
    .map(group => group[1])
}

function expand (grouped) {
  const expanded = []
  for (const group of grouped) {
    expanded.push(...group)
  }
  return expanded
}

module.exports = variableDefined
