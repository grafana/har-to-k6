import test from 'ava'
import declares from 'render/declares'

test('none', t => {
  const result = declares(new Set())
  t.is(result, null)
})

test('1', t => {
  const spec = new Set([ 'first' ])
  const result = declares(spec)
  t.is(result, `let first;`)
})

test('3', t => {
  const spec = new Set([ 'third', 'first', 'second' ])
  const result = declares(spec)
  t.is(result, `let first, second, third;`)
})
