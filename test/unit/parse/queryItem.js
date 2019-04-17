import test from 'ava'
import queryItem from 'parse/queryItem'

function makeSpec () {
  return new Map()
}

function makeState () {
  return {
    variable: false
  }
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

test('name static', t => {
  const state = makeState()
  queryItem({ name: 'search' }, makeSpec(), state)
  t.false(state.variable)
})

test('name variable', t => {
  const state = makeState()
  /* eslint-disable-next-line no-template-curly-in-string */
  queryItem({ name: '${key}' }, makeSpec(), state)
  t.true(state.variable)
})

test('value static', t => {
  const state = makeState()
  queryItem({ name: 'search', value: 'kittens' }, makeSpec(), state)
  t.false(state.variable)
})

test('value variable', t => {
  const state = makeState()
  /* eslint-disable-next-line no-template-curly-in-string */
  queryItem({ name: 'search', value: '${query}' }, makeSpec(), state)
  t.true(state.variable)
})

test('both variable', t => {
  const state = makeState()
  /* eslint-disable-next-line no-template-curly-in-string */
  queryItem({ name: '${key}', value: '${value}' }, makeSpec(), state)
  t.true(state.variable)
})
