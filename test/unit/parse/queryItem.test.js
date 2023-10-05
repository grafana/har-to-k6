import test from 'ava'
import queryItem from 'parse/queryItem'
import { queryState as makeState } from 'make'

function makeSpec() {
  return new Map()
}

test('it should ignore the query item when name is empty', t => {
  const spec = makeSpec()
  queryItem({ name: null }, spec, makeState())
  t.deepEqual(spec, new Map())
})

test('it should use an empty set when only the name is given', t => {
  const spec = makeSpec()
  queryItem({ name: 'search' }, spec, makeState())
  t.deepEqual(spec, new Map().set('search', new Set([{}])))
})

test('it should set the value of the query item when a value is given', t => {
  const spec = makeSpec()
  queryItem({ name: 'search', value: 'kittens' }, spec, makeState())
  t.deepEqual(spec, new Map().set('search', new Set([{ value: 'kittens' }])))
})

test('it should set the comment of the query item when a comment is given', t => {
  const spec = makeSpec()
  queryItem({ name: 'search', comment: 'Test a search' }, spec, makeState())
  t.deepEqual(
    spec,
    new Map().set('search', new Set([{ comment: 'Test a search' }]))
  )
})
