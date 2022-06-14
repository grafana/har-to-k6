const { HAR_KEYS } = require('../constants')

function createLogPath(rest = '') {
  return `${HAR_KEYS.log}${rest && `.${rest}`}`
}

function createPagesPath(pagesIndex, rest = '') {
  return createLogPath(`${HAR_KEYS.pages}[${pagesIndex}]${rest && `.${rest}`}`)
}

function createEntriesPath(entryIndex, rest = '') {
  return createLogPath(
    `${HAR_KEYS.entries}[${entryIndex}]${rest && `.${rest}`}`
  )
}

function createRequestPath(entryIndex, rest = '') {
  return createEntriesPath(
    entryIndex,
    `${HAR_KEYS.request}${rest && `.${rest}`}`
  )
}

function createHeadersPath(entryIndex, headerIndex, rest = '') {
  return createRequestPath(
    entryIndex,
    `${HAR_KEYS.headers}[${headerIndex}]${rest && `.${rest}`}`
  )
}

function createChecksPath(entryIndex, checkIndex, rest = '') {
  return createEntriesPath(
    entryIndex,
    `${HAR_KEYS.checks}[${checkIndex}]${rest && `.${rest}`}`
  )
}

function createCookiesPath(entryIndex, cookiesIndex, rest = '') {
  return createRequestPath(
    entryIndex,
    `${HAR_KEYS.cookies}[${cookiesIndex}]${rest && `.${rest}`}`
  )
}

function createPostDataPath(entryIndex, rest = '') {
  return createRequestPath(
    entryIndex,
    `${HAR_KEYS.postData}${rest && `.${rest}`}`
  )
}

function createPostDataParamsPath(entryIndex, paramIndex, rest = '') {
  return createPostDataPath(
    entryIndex,
    `${HAR_KEYS.params}[${paramIndex}]${rest && `.${rest}`}`
  )
}

function createQueryStringPath(entryIndex, queryStringIndex, rest = '') {
  return createRequestPath(
    entryIndex,
    `${HAR_KEYS.queryString}[${queryStringIndex}]${rest && `.${rest}`}`
  )
}

function createSleepPath(entryIndex, sleepIndex, rest = '') {
  return createEntriesPath(
    entryIndex,
    `${HAR_KEYS.sleep}[${sleepIndex}]${rest && `.${rest}`}`
  )
}

function createVariablesPath(entryIndex, variablesIndex, rest = '') {
  return createEntriesPath(
    entryIndex,
    `${HAR_KEYS.variables}[${variablesIndex}]${rest && `.${rest}`}`
  )
}

module.exports = {
  createLogPath,
  createPagesPath,
  createEntriesPath,
  createRequestPath,
  createHeadersPath,
  createChecksPath,
  createCookiesPath,
  createPostDataPath,
  createPostDataParamsPath,
  createQueryStringPath,
  createSleepPath,
  createVariablesPath,
}
