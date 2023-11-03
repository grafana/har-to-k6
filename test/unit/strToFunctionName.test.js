const test = require('ava')
const strToFunctionName = require('helpers/strToFunctionName')

/** @see strToFunctionName */
test('add underscore in front of reserved words', t => {
  t.is(strToFunctionName('eval'), '_eval')
  t.is(strToFunctionName('sleep'), '_sleep')
})

test('default to fallback when str is empty', t => {
  t.is(strToFunctionName(undefined, 'fallbackFunction'), 'fallbackFunction')
  t.is(strToFunctionName('', 'fallbackFunction'), 'fallbackFunction')
  t.is(strToFunctionName('myFunction', 'fallbackFunction'), 'myFunction')
})

/**
 * DEFAULT_FUNCTION_NAME resolves to undefined when imported in this test
 * which is why I'm using a hardcoded value
 *
 * @see constants~DEFAULT_FUNCTION_NAME */
test('fallback default value from DEFAULT_FUNCTION_NAME', t => {
  t.is(
    strToFunctionName(''),
    'main' /** @see constants~DEFAULT_FUNCTION_NAME  */
  )
  t.is(strToFunctionName(), 'main' /** @see constants~DEFAULT_FUNCTION_NAME  */)

  // should fallback if string becomes empty after manipulation is done
  t.is(
    strToFunctionName('="#)(=!/"¤'),
    'main' /** @see constants~DEFAULT_FUNCTION_NAME  */
  )
})

test('handle diacritics', t => {
  t.is(strToFunctionName('hellå wörld'), 'hellaWorld')
})

test('handle spaces and "weird" chars', t => {
  t.is(strToFunctionName('!\'m 1££7, "mk&y?'), 'm17Mky')
})

test('camelCase names', t => {
  // proper names should not be destroyed
  t.is(strToFunctionName('strToFunctionName'), 'strToFunctionName')
  // PascalCase
  t.is(strToFunctionName('StrToFunctionName'), 'strToFunctionName')
  // Some human readable string
  t.is(strToFunctionName('Human readable string'), 'humanReadableString')
  // first char is not a part of end result
  t.is(strToFunctionName('!Human readable string'), 'humanReadableString')
})

test('crazy stuff passed as first param', t => {
  t.is(strToFunctionName({ name: 'Cool Object' }), 'objectObject')
  t.is(strToFunctionName(null), '_null')
  t.is(
    strToFunctionName([-Infinity, { id: 'pojo' }, null, Infinity]),
    'infinityobjectObjectInfinity'
  )
})
