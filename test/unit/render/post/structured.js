const test = require('ava')
const isolate = require('helper/isolate')
const { requestSpec: makeRequestSpec } = require('make')
const [structured, { multipart, url }] = isolate(
  test,
  'render/post/structured',
  {
    multipart: 'render/post/multipart',
    url: 'render/post/url',
  }
)

test.serial('url', t => {
  const spec = makeRequestSpec()
  spec.post.type = 'application/x-www-form-urlencoded'
  structured(spec)
  t.true(url.calledOnce)
  t.true(multipart.notCalled)
})

test.serial('multipart', t => {
  const spec = makeRequestSpec()
  spec.post.type = 'multipart/form-data'
  structured(spec)
  t.true(multipart.calledOnce)
  t.true(url.notCalled)
})
