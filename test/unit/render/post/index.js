const test = require('ava')
const isolate = require('helper/isolate')
const { requestSpec: makeRequestSpec } = require('make')
const { PostSpecies } = require('enum')
const [post, { structured, unstructured }] = isolate(test, 'render/post', {
  structured: 'render/post/structured',
  unstructured: 'render/post/unstructured',
})

test.serial('empty', t => {
  const spec = makeRequestSpec()
  spec.state.post.species = PostSpecies.Empty
  const result = post(spec)
  t.true(unstructured.notCalled)
  t.true(structured.notCalled)
  t.is(result, null)
})

test.serial('unstructured', t => {
  const spec = makeRequestSpec()
  spec.state.post.species = PostSpecies.Unstructured
  post(spec)
  t.true(unstructured.calledOnce)
  t.true(structured.notCalled)
})

test.serial('structured', t => {
  const spec = makeRequestSpec()
  spec.state.post.species = PostSpecies.Structured
  post(spec)
  t.true(structured.calledOnce)
  t.true(unstructured.notCalled)
})
