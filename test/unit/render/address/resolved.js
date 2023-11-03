const test = require('ava')
const isolate = require('helper/isolate')
const {
  requestFactor: makeRequestFactor,
  requestSpec: makeRequestSpec,
} = require('make')
const [resolved, { template }] = isolate(test, 'render/address/resolved', {
  template: 'render/template',
})

test('basic', t => {
  /* eslint-disable no-template-curly-in-string */
  template.returns('`http://${vars["host"]}`')
  const factor = makeRequestFactor()
  const spec = makeRequestSpec()
  spec.address = 'http://${host}'
  resolved(spec, factor)
  t.is(factor.address, '`http://${vars["host"]}`')
  t.deepEqual(factor.pre, [])
  /* eslint-enable no-template-curly-in-string */
})
