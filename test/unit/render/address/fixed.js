import test from 'ava'
import isolate from 'helper/isolate'
import {
  requestFactor as makeRequestFactor,
  requestSpec as makeRequestSpec
} from 'make'
const [ fixed, { string } ] =
  isolate(test, 'render/address/fixed', { string: 'render/string' })

test('basic', t => {
  string.returns('"http://example.com"')
  const factor = makeRequestFactor()
  const spec = makeRequestSpec()
  spec.address = 'http://example.com'
  fixed(spec, factor)
  t.is(factor.address, '"http://example.com"')
})
