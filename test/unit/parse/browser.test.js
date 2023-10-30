const test = require('ava')
const browser = require('parse/browser')
const { result: makeResult } = require('make')

test('browser name', t => {
  const result = makeResult()
  browser({ name: 'Brave' }, result)
  t.is(result.comment[0], 'Browser: Brave')
})

test('browser version', t => {
  const result = makeResult()
  browser({ name: 'Brave', version: '1' }, result)
  t.is(result.comment[0], 'Browser: Brave 1')
})

test('browser comment', t => {
  const result = makeResult()
  browser({ name: 'Brave', comment: 'Developer build 20190103' }, result)
  t.is(
    result.comment[0],
    ['Browser: Brave', 'Developer build 20190103'].join('\n')
  )
})
