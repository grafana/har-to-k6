/* eslint-disable no-template-curly-in-string */

const test = require('ava')
const isolate = require('helper/isolate')
import {
  requestFactor as makeRequestFactor,
  requestSpec as makeRequestSpec,
} from 'make'
const [runtime, { query, text }] = isolate(test, 'render/address/runtime', {
  query: 'render/address/query',
  text: 'render/text',
})

test.serial('basic', t => {
  text.returns('`http://${vars["host"]}`')
  const spec = makeRequestSpec()
  spec.address = 'http://${host}'
  const factor = makeRequestFactor()
  runtime(spec, factor)
  t.deepEqual(factor.pre, ['address = new URL(`http://${vars["host"]}`);'])
  t.is(factor.address, `address.toString()`)
  t.true(query.calledOnce)
  t.true(text.calledOnce)
})

test.serial('protocol default', t => {
  text.returns('`${vars["address"]}`')
  const spec = makeRequestSpec()
  spec.address = '${address}'
  const factor = makeRequestFactor()
  runtime(spec, factor)
  t.deepEqual(factor.pre, [
    'address = new URL(`${vars["address"]}`);',
    `
if (!address.protocol) {
  address.protocol = "https";
}
`,
  ])
  t.is(factor.address, `address.toString()`)
})
