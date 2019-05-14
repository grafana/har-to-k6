import test from 'ava'
import arg from 'render/post/multipart/resolved/arg'

test('basic', t => {
  t.is(arg(), `body.build()`)
})
