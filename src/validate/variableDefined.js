const sort = require('../sort')
const { variables } = require('../expression')
const { InvalidArchiveError } = require('../error')

/*
 * method: variables defined
 * url: variables defined
 * queryItem name: variables defined
 * queryItem value: variables defined
 * header name: variables defined
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
function variableDefined(archive) {
  const entries = orderEntries(archive)
  const defined = new Set()

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    validate(entry.request, i, defined)
    define(entry, defined)
  }
}

function validate(request, i, defined) {
  validateString(request.method, i, null, defined, 'Request method')
  validateString(request.url, i, null, defined, 'Request URL')
  queryString(request.queryString, i, defined)
  headers(request.headers, i, defined)
  cookies(request.cookies, i, defined)
  postData(request.postData, i, defined)
}

function validateString(value, i, j, defined, property) {
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

function queryString(node, i, defined) {
  if (node) {
    for (let j = 0; j < node.length; j++) {
      const queryItem = node[j]
      validateString(queryItem.name, i, j, defined, 'Query item name')
      validateString(queryItem.value, i, j, defined, 'Query item value')
    }
  }
}

function headers(node, i, defined) {
  if (node) {
    for (let j = 0; j < node.length; j++) {
      const header = node[j]
      validateString(header.name, i, j, defined, 'Header name')
      validateString(header.value, i, j, defined, 'Header value')
    }
  }
}

function cookies(node, i, defined) {
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

function postData(node, i, defined) {
  if (node) {
    validateString(node.text, i, null, defined, 'Post text')
    params(node.params, i, defined)
  }
}

function params(node, i, defined) {
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

function referenced(string) {
  if (string) {
    return matchVariables(string).map((match) => match[1])
  } else {
    return []
  }
}

function matchVariables(string) {
  const matches = []
  let match
  while ((match = variables.exec(string)) !== null) {
    matches.push(match)
  }
  variables.lastIndex = 0
  return matches
}

function define(entry, defined) {
  if (entry.variables) {
    for (const variable of entry.variables) {
      defined.add(variable.name)
    }
  }
}

function zipGroups(entries) {
  const groupedEntries = entries.reduce((result, entry) => {
    if (entry.pageref) {
      if (!result.has(entry.pageref)) {
        result.set(entry.pageref, [])
      }

      result.set(entry.pageref, [...result.get(entry.pageref), entry])
    } else {
      result.set(entry)
    }

    return result
  }, new Map())

  return [...groupedEntries.entries()].flatMap(([item, children]) => children || item)
}

function orderEntries(archive) {
  const entries = archive.log.entries || []

  // No matter if entry is external, page is explicit or implicit the order of entries are always respected
  // order should be the same order as the rendered output.
  return zipGroups(entries)
}

// eslint-disable-next-line no-unused-vars
function extractPages(pages) {
  if (pages) {
    return new Map(pages.map((page) => [page.id, page.index]))
  } else {
    return new Map()
  }
}

// eslint-disable-next-line no-unused-vars
function orderExplicit(entries, pages) {
  const unordered = entries.filter((entry) => pages.has(entry.pageref))
  const groups = groupEntries(unordered)
  const orderedGroups = orderGroupsByIndex(groups, pages)
  return expand(orderedGroups)
}

// eslint-disable-next-line no-unused-vars
function orderImplicit(entries, pages) {
  const unordered = entries.filter((entry) => entry.pageref && !pages.has(entry.pageref))
  const groups = groupEntries(unordered)
  const orderedGroups = orderGroupsByName(groups)
  return expand(orderedGroups)
}

function groupEntries(entries) {
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

function orderGroupsByIndex(groups, pages) {
  return [...groups]
    .map((group) => [pages.get(group[0]), group[1]])
    .sort(sort.firstElement)
    .map((group) => group[1])
}

function orderGroupsByName(groups) {
  return [...groups].sort(sort.firstElement).map((group) => group[1])
}

function expand(grouped) {
  const expanded = []
  for (const group of grouped) {
    expanded.push(...group)
  }
  return expanded
}

module.exports = variableDefined
