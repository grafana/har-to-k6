import test from 'ava'
import isolate from 'helper/isolate'
import { requestSpec as makeRequestSpec } from 'make'

const [fixed, { comment, note, string }] = isolate(test, 'render/post/multipart/fixed', {
  comment: 'render/comment',
  note: 'render/note/map',
  string: 'render/string'
})

test.serial('result', t => {
  const spec = makeRequestSpec()
  spec.post.params = new Map()
  string.returns('rendered')
  const result = fixed(spec)
  t.is(result, 'rendered')
})

test.serial('build', t => {
  const spec = makeRequestSpec()
  spec.post.params = new Map().set('search', new Set([{ value: 'kitten' }]))
  fixed(spec)
  t.true(string.firstCall.args[0].startsWith('Content-Type: multipart/form-data;'))
})

test.serial('field with fileName', t => {
  const spec = makeRequestSpec()
  spec.post.params = new Map().set(
    'search',
    new Set([{ value: 'kitten', contentType: 'text/csv', fileName: 'data.csv' }])
  )
  fixed(spec)
  const result = string.firstCall.args[0].split('\r\n')
  t.is(result[7], 'Content-Type: text/csv')
  t.is(result[8], 'Content-Disposition: form-data; name=search; filename=data.csv')
  t.is(result[9], 'Content-Transfer-Encoding: base64')
  t.is(result[11], 'a2l0dGVu')
})

test.serial('field', t => {
  const spec = makeRequestSpec()
  spec.post.params = new Map().set(
    'search',
    new Set([{ value: 'kitten' }])
  )
  fixed(spec)
  const result = string.firstCall.args[0].split('\r\n')
  t.is(result[7], 'Content-Disposition: form-data; name=search')
  t.is(result[8], 'Content-Transfer-Encoding: quoted-printable')
  t.is(result[10], 'kitten')
})

test.serial('boundary', t => {
  const spec = makeRequestSpec()
  spec.state.post.boundary = 'foobar'
  spec.post.params = new Map().set(
    'search',
    new Set([{ value: 'kitten' }])
  )
  fixed(spec)
  const result = string.firstCall.args[0].split('\r\n')
  t.is(result[5], '--foobar')
  t.is(result[10], '--foobar--')
})

test.serial('comment', t => {
  note.returns('-search- Find kittens')
  comment.returns('// -search- Find kittens')
  string.returns('"search=kitten"')
  const spec = makeRequestSpec()
  spec.post.params = new Map().set(
    'search',
    new Set([{ value: 'kitten', comment: 'Find kittens' }])
  )
  const result = fixed(spec)
  t.deepEqual(note.firstCall.args[0], spec.post.params)
  t.is(comment.firstCall.args[0], '-search- Find kittens')
  t.true(result.startsWith(`// -search- Find kittens`))
})
