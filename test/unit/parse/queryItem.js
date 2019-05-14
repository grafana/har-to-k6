import test from 'ava'
import queryItem from 'parse/queryItem'
import { queryState as makeState } from 'make'

function makeSpec () {
  return new Map()
}

test('minimal', t => {
  const spec = makeSpec()
  queryItem({ name: 'search' }, spec, makeState())
  t.deepEqual(
    spec,
    new Map()
      .set('search', new Set([ {} ]))
  )
})

test('value', t => {
  const spec = makeSpec()
  queryItem({ name: 'search', value: 'kittens' }, spec, makeState())
  t.deepEqual(
    spec,
    new Map()
      .set('search', new Set([ { value: 'kittens' } ]))
  )
})

test('comment', t => {
  const spec = makeSpec()
  queryItem({ name: 'search', comment: 'Test a search' }, spec, makeState())
  t.deepEqual(
    spec,
    new Map()
      .set('search', new Set([ { comment: 'Test a search' } ]))
  )
})
