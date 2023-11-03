const test = require('ava')
const identifier = require('species/string/identifier')

test('pass', t => {
  t.true(identifier('token'))
})

test('fail', t => {
  t.false(identifier('Content-Type'))
})
