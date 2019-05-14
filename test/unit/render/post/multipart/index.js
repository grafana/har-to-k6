import test from 'ava'
import isolate from 'helper/isolate'
import { requestSpec as makeRequestSpec } from 'make'
const [ multipart, { fixed, resolved } ] =
  isolate(test, 'render/post/multipart', {
    fixed: 'render/post/multipart/fixed',
    resolved: 'render/post/multipart/resolved/arg'
  })

test.serial('fixed', t => {
  const spec = makeRequestSpec()
  spec.state.params.variable = false
  multipart(spec)
  t.true(fixed.calledOnce)
  t.true(resolved.notCalled)
})

test.serial('resolved', t => {
  const spec = makeRequestSpec()
  spec.state.params.variable = true
  multipart(spec)
  t.true(resolved.calledOnce)
  t.true(fixed.notCalled)
})
