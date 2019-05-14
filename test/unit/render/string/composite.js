import test from 'ava'
import composite from 'render/string/composite'

test('empty', t => {
  t.is(composite([]), '""')
})

test('1', t => {
  t.is(composite([ 'GET' ]), '"GET"')
})

test('3', t => {
  t.is(composite([ 'GET', 'POST', 'HEAD' ]), '"GETPOSTHEAD"')
})

test('empty item', t => {
  t.is(composite([ 'GET', '', 'HEAD' ]), '"GETHEAD"')
})

test('delimiter', t => {
  t.is(composite([ 'GET', '', 'HEAD' ], ','), '"GET,,HEAD"')
})
