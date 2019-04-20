import test from 'ava'
import params from 'parse/state/params'
import { requestSpec as makeRequestSpec } from 'make'

test('empty', t => {
  const spec = makeRequestSpec()
  params(spec)
  t.false(spec.state.params.variable)
})

test('static', t => {
  const spec = makeRequestSpec()
  spec.post.params = new Map()
    .set('search', new Set([ { value: 'kitten' }, { value: 'puppy' } ]))
    .set('filter', new Set([ { value: 'cute' } ]))
    .set('order', new Set([ { value: 'cuteness:descending' } ]))
  params(spec)
  t.false(spec.state.params.variable)
})

test('variable name', t => {
  const spec = makeRequestSpec()
  /* eslint-disable-next-line no-template-curly-in-string */
  spec.post.params = new Map().set('${flag}', new Set([ {} ]))
  params(spec)
  t.true(spec.state.params.variable)
})

test('variable value', t => {
  const spec = makeRequestSpec()
  spec.post.params = new Map()
    /* eslint-disable-next-line no-template-curly-in-string */
    .set('search', new Set([ { value: '${search}' } ]))
  params(spec)
  t.true(spec.state.params.variable)
})
