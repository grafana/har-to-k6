import test from 'ava'
import post from 'parse/state/post'
import { requestSpec as makeRequestSpec } from 'make'
import { PostSpecies } from 'enum'

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
  spec.post.type = 'multipart/form-data'
  spec.post.params = [ {}, {}, {} ]
  post(spec)
  t.is(spec.state.post.species, PostSpecies.Structured)
})
