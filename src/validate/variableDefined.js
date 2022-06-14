const sort = require('../sort')
const { variables } = require('../expression')
const { InvalidArchiveError } = require('../error')
const { CheckType } = require('../enum')
const {
  createRequestPath,
  createQueryStringPath,
  createHeadersPath,
  createCookiesPath,
  createPostDataParamsPath,
  createPostDataPath,
  createChecksPath,
} = require('./utils/path')
const {
  createEntriesIndexes,
  createQueryStringIndexes,
  createHeadersIndexes,
  createCookiesIndexes,
  createPostDataParamsIndexes,
  createChecksIndexes,
} = require('./utils/indexes')

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
    validate({ request: entry.request, checks: entry.checks }, i, defined)
    define(entry, defined)
  }
}

function validate({ request, checks }, i, defined) {
  validateString(
    request.method,
    createRequestPath(i, 'method'),
    createEntriesIndexes(i),
    defined,
    'Request method'
  )
  validateString(
    request.url,
    createRequestPath(i, 'url'),
    createEntriesIndexes(i),
    defined,
    'Request URL'
  )
  queryString(request.queryString, i, defined)
  headers(request.headers, i, defined)
  cookies(request.cookies, i, defined)
  postData(request.postData, i, defined)
  validateChecks(checks, i, defined)
}

function validateString(value, path, indexes, defined, property) {
  for (const name of referenced(value)) {
    if (!defined.has(name)) {
      throw new InvalidArchiveError(
        { name: 'UndefinedVariable', path, indexes },
        `${property} referenced undefined variable: ${name}`
      )
    }
  }
}

function validateChecks(checks = [], topLevelIndex, defined) {
  checks.forEach((check, index) => {
    const value =
      check.type === CheckType.Regex ? check.expression : check.value
    const path = check.type === CheckType.Regex ? 'expression' : 'value'
    const property =
      check.type === CheckType.Regex ? 'Check expression' : 'Check value'
    validateString(
      value,
      createChecksPath(topLevelIndex, index, path),
      createChecksIndexes(topLevelIndex, index),
      defined,
      property
    )
  })
}

function queryString(node, i, defined) {
  const _validate = (value, key, [i, j], name) =>
    validateString(
      value,
      createQueryStringPath(i, j, key),
      createQueryStringIndexes(i, j),
      defined,
      name
    )

  if (node) {
    for (let j = 0; j < node.length; j++) {
      const queryItem = node[j]
      _validate(queryItem.name, 'name', [i, j], 'Query item name')
      _validate(queryItem.value, 'value', [i, j], 'Query item value')
    }
  }
}

function headers(node, i, defined) {
  const _validate = (value, key, [i, j], name) =>
    validateString(
      value,
      createHeadersPath(i, j, key),
      createHeadersIndexes(i, j),
      defined,
      name
    )

  if (node) {
    for (let j = 0; j < node.length; j++) {
      const header = node[j]
      _validate(header.name, 'name', [i, j], 'Header name')
      _validate(header.value, 'value', [i, j], 'Header value')
    }
  }
}

function cookies(node, i, defined) {
  const _validate = (value, key, [i, j], name) =>
    validateString(
      value,
      createCookiesPath(i, j, key),
      createCookiesIndexes(i, j),
      defined,
      name
    )

  if (node) {
    for (let j = 0; j < node.length; j++) {
      const cookie = node[j]
      _validate(cookie.name, 'name', [i, j], 'Cookie name')
      _validate(cookie.value, 'value', [i, j], 'Cookie value')
      _validate(cookie.path, 'path', [i, j], 'Cookie path')
      _validate(cookie.domain, 'domain', [i, j], 'Cookie domain')
    }
  }
}

function postData(node, i, defined) {
  if (node) {
    validateString(
      node.text,
      createPostDataPath(i, 'text'),
      createEntriesIndexes(i),
      defined,
      'Post text'
    )
    params(node.params, i, defined)
  }
}

function params(node, i, defined) {
  const _validate = (value, key, [i, j], name) =>
    validateString(
      value,
      createPostDataParamsPath(i, j, key),
      createPostDataParamsIndexes(i, j),
      defined,
      name
    )

  if (node) {
    for (let j = 0; j < node.length; j++) {
      const param = node[j]
      _validate(param.name, 'name', [i, j], 'Param name')
      _validate(param.value, 'value', [i, j], 'Param value')
      _validate(param.fileName, 'fileName', [i, j], 'Param file name')
      _validate(param.contentType, 'contentType', [i, j], 'Param content type')
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

  return [...groupedEntries.entries()].flatMap(
    ([item, children]) => children || item
  )
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
  const unordered = entries.filter(
    (entry) => entry.pageref && !pages.has(entry.pageref)
  )
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
