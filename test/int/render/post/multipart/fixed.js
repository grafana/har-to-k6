import test from 'ava'
import isolate from 'helper/isolate'
const [ fixed, { string } ] =
  isolate(test, 'render/post/multipart/fixed', { string: 'render/string' })

test.serial('result', t => {
  const rendered = Symbol('rendered')
  string.returns(rendered)
  const result = fixed(new Map())
  t.is(result, rendered)
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
