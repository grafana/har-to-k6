const test = require('ava')
const sleep = require('render/sleep')

test('number', t => {
  const result = sleep(1200)
  t.is(result, 'sleep(1.2);')
})

test('zero', t => {
  const result = sleep(0)
  t.is(result, 'sleep(0);')
})
