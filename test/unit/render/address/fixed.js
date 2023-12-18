const test = require('ava')
const isolate = require('helper/isolate')
const {
  requestFactor: makeRequestFactor,
  requestSpec: makeRequestSpec,
  websocketFactor: makeWebsocketFactor,
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

  string.returns('"wss://example.com"')
  const ws_factor = makeWebsocketFactor()
  const ws_spec = makeRequestSpec()
  spec.address = 'wss://example.com'
  fixed(ws_spec, ws_factor)
  t.is(ws_factor.address, '"wss://example.com"')
  t.deepEqual(ws_factor.pre, undefined)
})
