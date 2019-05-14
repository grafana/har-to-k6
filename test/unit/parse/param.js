import test from 'ava'
import param from 'parse/param'

function makeSpec () {
  return new Map()
}

test('minimal', t => {
  const spec = makeSpec()
  param({ name: 'search' }, spec)
  t.deepEqual(
    spec,
    new Map()
      .set('search', new Set([ {} ]))
  )
})

test('value', t => {
  const spec = makeSpec()
  param({ name: 'search', value: 'kittens' }, spec)
  t.deepEqual(
    spec,
    new Map()
      .set('search', new Set([ { value: 'kittens' } ]))
  )
})

test('fileName', t => {
  const spec = makeSpec()
  param({ name: 'data', fileName: 'data.csv' }, spec)
  t.deepEqual(
    spec,
    new Map()
      .set('data', new Set([ { fileName: 'data.csv' } ]))
  )
})

test('contentType', t => {
  const spec = makeSpec()
  param({ name: 'data', contentType: 'text/csv' }, spec)
  t.deepEqual(
    spec,
    new Map()
      .set('data', new Set([ { type: 'text/csv' } ]))
  )
})

test('comment', t => {
  const spec = makeSpec()
  param({ name: 'data', comment: 'Test importing data' }, spec)
  t.deepEqual(
    spec,
    new Map()
      .set('data', new Set([ { comment: 'Test importing data' } ]))
  )
})
