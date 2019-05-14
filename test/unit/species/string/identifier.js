import test from 'ava'
import identifier from 'species/string/identifier'

test('pass', t => {
  t.true(identifier('token'))
})

test('fail', t => {
  t.false(identifier('Content-Type'))
})
