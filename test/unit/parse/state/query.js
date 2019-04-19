import test from 'ava'
import query from 'parse/state/query'
import { requestSpec as makeRequestSpec } from 'make'

test('empty', t => {
  const spec = makeRequestSpec()
  query(spec)
  t.false(spec.state.query.variable)
})

test('static', t => {
  const spec = makeRequestSpec()
  spec.query
    .set('search', new Set([ { value: 'kitten' }, { value: 'puppy' } ]))
    .set('filter', new Set([ { value: 'cute' } ]))
    .set('order', new Set([ { value: 'cuteness:descending' } ]))
  query(spec)
  t.false(spec.state.query.variable)
})

test('variable name', t => {
  const spec = makeRequestSpec()
  /* eslint-disable-next-line no-template-curly-in-string */
  spec.query.set('${flag}', new Set([ {} ]))
  query(spec)
  t.true(spec.state.query.variable)
})

test('variable value', t => {
  const spec = makeRequestSpec()
  /* eslint-disable-next-line no-template-curly-in-string */
  spec.query.set('search', new Set([ { value: '${search}' } ]))
  query(spec)
  t.true(spec.state.query.variable)
})
