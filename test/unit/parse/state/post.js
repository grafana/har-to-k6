const test = require('ava')
const post = require('parse/state/post')
const { requestSpec: makeRequestSpec } = require('make')
const { PostSpecies } = require('enum')

test('empty', t => {
  const spec = makeRequestSpec()
  post(spec)
  t.is(spec.state.post.species, PostSpecies.Empty)
})

test('unstructured', t => {
  const spec = makeRequestSpec()
  spec.post.type = 'text/plain'
  spec.post.text = 'Good post'
  post(spec)
  t.is(spec.state.post.species, PostSpecies.Unstructured)
})

test('structured', t => {
  const spec = makeRequestSpec()
  spec.headers.set('content-type', new Set([{ value: `multipart/form-data;` }]))
  spec.post.params = [{}, {}, {}]
  post(spec)
  t.is(spec.state.post.species, PostSpecies.Structured)
})

test('generated boundary', t => {
  const spec = makeRequestSpec()
  spec.headers.set('content-type', new Set([{ value: `multipart/form-data;` }]))
  spec.post.params = [{}, {}, {}]
  post(spec)
  t.not(spec.state.post.boundary, null)
})

test('existing boundary is respected', t => {
  const spec = makeRequestSpec()
  spec.headers.set(
    'content-type',
    new Set([
      { value: `multipart/form-data; boundary=----someKindOfLongBoundary` },
    ])
  )
  spec.post.params = [{}, {}, {}]
  post(spec)
  t.is(spec.state.post.boundary, '----someKindOfLongBoundary')
})
