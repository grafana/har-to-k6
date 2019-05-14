import test from 'ava'
import indent from 'render/indent'

test('1 line', t => {
  const result = indent('doImportantThings();')
  t.is(result, '  doImportantThings();')
})

test('3 lines', t => {
  const result = indent('' +
`first();
second();
third();`)
  t.is(result, '' +
`  first();
  second();
  third();`)
})

test('empty lines', t => {
  const result = indent('' +
`first();

second();

third();`)
  t.is(result, '' +
`  first();

  second();

  third();`)
})
