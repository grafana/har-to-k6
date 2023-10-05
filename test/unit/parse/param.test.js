import test from 'ava'
import param from 'parse/param'

function makeSpec() {
  return new Map()
}

test('it should ignore the param if the name is empty', t => {
  const spec = makeSpec()
  param({ name: null }, spec)
  t.deepEqual(spec, new Map())
})

test('it should use an empty object when only the name is given', t => {
  const spec = makeSpec()
  param({ name: 'search' }, spec)
  t.deepEqual(spec, new Map().set('search', new Set([{}])))
})

test('it should set the value of params when a value is given', t => {
  const spec = makeSpec()
  param({ name: 'search', value: 'kittens' }, spec)
  t.deepEqual(spec, new Map().set('search', new Set([{ value: 'kittens' }])))
})

test('it should set the value of params when it is empty', t => {
  const spec = makeSpec()
  param({ name: 'search', value: '' }, spec)
  t.deepEqual(spec, new Map().set('search', new Set([{ value: '' }])))
})

test('it should set the fileName of params when a fileName is given', t => {
  const spec = makeSpec()
  param({ name: 'data', fileName: 'data.csv' }, spec)
  t.deepEqual(spec, new Map().set('data', new Set([{ fileName: 'data.csv' }])))
})

test('it should set the contentType of params when a contentType is given', t => {
  const spec = makeSpec()
  param({ name: 'data', contentType: 'text/csv' }, spec)
  t.deepEqual(spec, new Map().set('data', new Set([{ type: 'text/csv' }])))
})

test('it should set the comment of params when a comment is given', t => {
  const spec = makeSpec()
  param({ name: 'data', comment: 'Test importing data' }, spec)
  t.deepEqual(
    spec,
    new Map().set('data', new Set([{ comment: 'Test importing data' }]))
  )
})
