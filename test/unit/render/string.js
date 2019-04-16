import test from 'ava'
import string from 'render/string'

test('basic', t => {
  t.is(string('GET'), '"GET"')
})

test('escape', t => {
  t.is(string('line 1\nline 2'), '"line 1\\nline 2"')
})
