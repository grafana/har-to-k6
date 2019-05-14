import test from 'ava'
import isolate from 'helper/isolate'
const [ fixed, { comment, note, string } ] =
  isolate(test, 'render/post/multipart/fixed', {
    comment: 'render/comment',
    note: 'render/note/map',
    string: 'render/string'
  })

test.serial('result', t => {
  string.returns('rendered')
  const result = fixed(new Map())
  t.is(result, 'rendered')
})

test.serial('build', t => {
  const params = new Map()
    .set('search', new Set([ { value: 'kitten' } ]))
  fixed(params)
  t.true(
    string.firstCall.args[0].startsWith('Content-Type: multipart/form-data;')
  )
})

test.serial('field', t => {
  const params = new Map()
    .set('search', new Set([ { value: 'kitten' } ]))
  fixed(params)
  const result = string.firstCall.args[0].split('\r\n')
  t.is(result[7], 'Content-Disposition: form-data; name=search')
  t.is(result[8], 'Content-Transfer-Encoding: base64')
  t.is(result[10], 'a2l0dGVu')
})

test.serial('comment', t => {
  note.returns('-search- Find kittens')
  comment.returns('// -search- Find kittens')
  string.returns('"search=kitten"')
  const params = new Map()
    .set('search', new Set([
      { value: 'kitten', comment: 'Find kittens' }
    ]))
  const result = fixed(params)
  t.deepEqual(note.firstCall.args[0], params)
  t.is(comment.firstCall.args[0], '-search- Find kittens')
  t.true(result.startsWith(`// -search- Find kittens`))
})
