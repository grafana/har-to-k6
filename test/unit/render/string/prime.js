const test = require('ava')
const prime = require('render/string/prime')

test('basic', t => {
  t.is(prime('GET'), '"GET"')
})

test('escape', t => {
  t.is(prime('line 1\nline 2'), '"line 1\\nline 2"')
})
