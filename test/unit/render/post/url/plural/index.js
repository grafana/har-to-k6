const test = require('ava')
const isolate = require('helper/isolate')
const { requestSpec: makeRequestSpec } = require('make')
const [plural, { fixed, resolved }] = isolate(test, 'render/post/url/plural', {
  fixed: 'render/post/url/plural/fixed',
  resolved: 'render/post/url/plural/resolved',
})

test.serial('fixed', t => {
  const spec = makeRequestSpec()
  spec.state.params.variable = false
  plural(spec)
  t.true(fixed.calledOnce)
  t.true(resolved.notCalled)
})

test.serial('resolved', t => {
  const spec = makeRequestSpec()
  spec.state.params.variable = true
  plural(spec)
  t.true(resolved.calledOnce)
  t.true(fixed.notCalled)
})
