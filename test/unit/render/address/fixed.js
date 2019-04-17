import test from 'ava'
import isolate from 'helper/isolate'
import { requestFactor as makeRequestFactor } from 'make'
const [ fixed, { string } ] =
  isolate(test, 'render/address/fixed', { string: 'render/string' })

test('basic', t => {
  string.returns('"http://example.com"')
  const factor = makeRequestFactor()
  fixed('http://example.com', factor)
  t.is(factor.address, '"http://example.com"')
})
