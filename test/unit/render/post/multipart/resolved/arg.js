const test = require('ava')
const arg = require('render/post/multipart/resolved/arg')

test('basic', t => {
  t.is(arg(), `body.build()`)
})
