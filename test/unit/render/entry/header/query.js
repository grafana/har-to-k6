import test from 'ava'
import query from 'render/entry/header/query'
import { requestSpec as makeRequestSpec } from 'make'

test('no query', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = false
  spec.state.query.variable = false
  const result = query(spec)
  t.is(result, null)
})

test('variable address', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = true
  spec.state.query.variable = false
  const result = query(spec)
  t.is(result, null)
})

test('variable query', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = false
  spec.state.query.variable = true
  const result = query(spec)
  t.is(result, null)
})

test('no comment', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = false
  spec.state.query.variable = false
  spec.query.set('search', new Set([ { value: 'kittens' } ]))
  spec.query.set('filter', new Set([ { value: 'cute' } ]))
  spec.query.set('order', new Set([ { value: 'cuteness' } ]))
  const result = query(spec)
  t.is(result, null)
})

test('1 scalar', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = false
  spec.state.query.variable = false
  spec.query.set('search', new Set([ {
    value: 'kittens',
    comment: 'Find kittens'
  } ]))
  const result = query(spec)
  t.is(result, '' +
`Query string notes:
search: Find kittens`)
})

test('3 scalar', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = false
  spec.state.query.variable = false
  spec.query.set('search', new Set([ {
    value: 'kittens',
    comment: 'Find kittens'
  } ]))
  spec.query.set('filter', new Set([ {
    value: 'cute',
    comment: 'Only find cute kittens'
  } ]))
  spec.query.set('order', new Set([ {
    value: 'cuteness',
    comment: 'Show me the cutest kittens first'
  } ]))
  const result = query(spec)
  t.is(result, '' +
`Query string notes:
search: Find kittens
filter: Only find cute kittens
order: Show me the cutest kittens first`)
})

test('plural', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = false
  spec.state.query.variable = false
  spec.query.set('search', new Set([
    { value: 'kittens', comment: 'Find kittens' },
    { value: 'puppies', comment: 'Also find puppies' },
    { value: 'quokkas', comment: 'Also find quokkas' }
  ]))
  const result = query(spec)
  t.is(result, '' +
`Query string notes:
search[0]: Find kittens
search[1]: Also find puppies
search[2]: Also find quokkas`)
})

test('1 multiline', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = false
  spec.state.query.variable = false
  spec.query.set('search', new Set([
    { value: 'quokkas', comment: 'Find quokkas\nThey are the best' }
  ]))
  const result = query(spec)
  t.is(result, '' +
`Query string notes:
search:
Find quokkas
They are the best`)
})

test('3 multiline', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = false
  spec.state.query.variable = false
  spec.query.set('search', new Set([
    { value: 'kittens', comment: 'Find kittens\nThey are cute' },
    { value: 'puppies', comment: 'Also find puppies\nThey are also nice' },
    { value: 'quokkas', comment: 'Also find quokkas\nThey are the best' }
  ]))
  const result = query(spec)
  t.is(result, '' +
`Query string notes:
search[0]:
Find kittens
They are cute
search[1]:
Also find puppies
They are also nice
search[2]:
Also find quokkas
They are the best`)
})
