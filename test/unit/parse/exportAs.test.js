const test = require('ava')
const exportAs = require('parse/exportAs')
const { result: makeResult } = require('make')

test('default export', t => {
  const result = makeResult()
  exportAs(undefined, result)

  t.true(result.defaultExport)
})

test('named export', t => {
  const result = makeResult()
  exportAs('main', result)

  t.false(result.defaultExport)
})

test('reserved name', t => {
  const result = makeResult()
  const expected = makeResult()
  expected.defaultExport = false
  expected.exportAs = '_null'

  exportAs(null, result)
  t.deepEqual(result, expected)
})

/** @see strToFunctionName */
test('ambiguous name', t => {
  const result = makeResult()

  exportAs(
    'HWIUD!()/)("a(N9jn9j8dn218n!))")#ÄÖåöö,.-_.,-.,)(/)39281317323',
    result
  )
  t.is(result.exportAs, 'hWIUDaN9jn9j8dn218nAOaoo_39281317323')
})
