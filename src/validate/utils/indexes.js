const { HAR_KEYS } = require('../constants')

function createEntriesIndexes(entryIndex, ...indexes) {
  return [[HAR_KEYS.entries, entryIndex], ...indexes]
}

function createPagesIndexes(pagesIndex, ...indexes) {
  return [[HAR_KEYS.pages, pagesIndex], ...indexes]
}

function createHeadersIndexes(entryIndex, headerIndex) {
  return createEntriesIndexes(entryIndex, [HAR_KEYS.headers, headerIndex])
}

function createChecksIndexes(entryIndex, checkIndex) {
  return createEntriesIndexes(entryIndex, [HAR_KEYS.checks, checkIndex])
}

function createCookiesIndexes(entryIndex, cookieIndex) {
  return createEntriesIndexes(entryIndex, [HAR_KEYS.cookies, cookieIndex])
}

function createPostDataParamsIndexes(entryIndex, paramIndex) {
  return createEntriesIndexes(entryIndex, [HAR_KEYS.params, paramIndex])
}

function createQueryStringIndexes(entryIndex, queryStringIndex) {
  return createEntriesIndexes(entryIndex, [
    HAR_KEYS.queryString,
    queryStringIndex,
  ])
}

function createSleepIndexes(entryIndex, sleepIndex) {
  return createEntriesIndexes(entryIndex, [HAR_KEYS.sleep, sleepIndex])
}

function createVariablesIndexes(entryIndex, variableIndex) {
  return createEntriesIndexes(entryIndex, [HAR_KEYS.variables, variableIndex])
}

module.exports = {
  createPagesIndexes,
  createEntriesIndexes,
  createHeadersIndexes,
  createChecksIndexes,
  createCookiesIndexes,
  createPostDataParamsIndexes,
  createQueryStringIndexes,
  createSleepIndexes,
  createVariablesIndexes,
}
