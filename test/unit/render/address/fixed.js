const test = require('ava')
const isolate = require('helper/isolate')
const {
  requestFactor: makeRequestFactor,
  requestSpec: makeRequestSpec,
} = require('make')
const [fixed, { string }] = isolate(test, 'render/address/fixed', {
  string: 'render/string',
})

test('basic', t => {
  string.returns('"http://example.com"')
  const factor = makeRequestFactor()
  const spec = makeRequestSpec()
  spec.address = 'http://example.com'
  fixed(spec, factor)
  t.is(factor.address, '"http://example.com"')
  t.deepEqual(factor.pre, [])
})
