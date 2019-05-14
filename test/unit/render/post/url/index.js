import test from 'ava'
import isolate from 'helper/isolate'
import { requestSpec as makeRequestSpec } from 'make'
const [ url, { plural, singular } ] =
  isolate(test, 'render/post/url', {
    plural: 'render/post/url/plural',
    singular: 'render/post/url/singular'
  })

test.serial('singular', t => {
  const spec = makeRequestSpec()
  spec.state.params.plural = false
  url(spec)
  t.true(singular.calledOnce)
  t.true(plural.notCalled)
})

test.serial('plural', t => {
  const spec = makeRequestSpec()
  spec.state.params.plural = true
  url(spec)
  t.true(plural.calledOnce)
  t.true(singular.notCalled)
})
