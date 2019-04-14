import test from 'ava'
import block from 'render/block'

test('empty', t => {
  const result = block([])
  t.is(result, '{}')
})

test('1 section', t => {
  const result = block([ 'first();' ])
  t.is(result, `{
  first();
}`)
})

test('3 sections', t => {
  const result = block([
    'first();',
    'const value = getValue();' +
      '\nsecond(value);',
    'third();'
  ])
  t.is(result, `{
  first();

  const value = getValue();
  second(value);

  third();
}`)
})
