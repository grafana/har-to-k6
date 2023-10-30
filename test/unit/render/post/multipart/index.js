const test = require('ava')
const isolate = require('helper/isolate')
const { requestSpec: makeRequestSpec } = require('make')
const [multipart, { fixed, resolved }] = isolate(
  test,
  'render/post/multipart',
  {
    fixed: 'render/post/multipart/fixed',
    resolved: 'render/post/multipart/resolved/arg',
  }
)

test.serial('fixed', t => {
  const spec = makeRequestSpec()
  spec.state.params.variable = false
  multipart(spec)
  t.true(fixed.calledOnce)
  t.true(resolved.notCalled)
})

test.serial('resolved', t => {
  t.throws(
    () => {
      const spec = makeRequestSpec()
      spec.state.params.variable = true
      multipart(spec)
    },
    { name: 'UnrecognizedStructuredPostType' }
  )
})
