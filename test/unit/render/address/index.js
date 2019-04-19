import test from 'ava'
import isolate from 'helper/isolate'
import {
  requestSpec as makeRequestSpec,
  requestFactor as makeRequestFactor
} from 'make'
const [ address, { constructed, fixed, resolved, runtime } ] =
  isolate(test, 'render/address', {
    constructed: 'render/address/constructed',
    fixed: 'render/address/fixed',
    resolved: 'render/address/resolved',
    runtime: 'render/address/runtime'
  })

test.serial('fixed', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = false
  spec.state.address.variableStart = false
  spec.state.query.variable = false
  const factor = makeRequestFactor()
  address(spec, factor)
  t.true(fixed.calledOnce)
})

test.serial('constructed', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = false
  spec.state.address.variableStart = false
  spec.state.query.variable = false
  spec.query.set('search', new Set([ { value: 'kitten' } ]))
  const factor = makeRequestFactor()
  address(spec, factor)
  t.true(constructed.calledOnce)
})

test.serial('resolved', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = true
  spec.state.address.variableStart = false
  spec.state.query.variable = false
  const factor = makeRequestFactor()
  address(spec, factor)
  t.true(resolved.calledOnce)
})

test.serial('runtime address variable start', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = true
  spec.state.address.variableStart = true
  spec.state.query.variable = false
  const factor = makeRequestFactor()
  address(spec, factor)
  t.true(runtime.calledOnce)
})

test.serial('runtime address variable + query', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = true
  spec.state.address.variableStart = false
  spec.state.query.variable = false
  spec.query.set('search', new Set([ { value: 'kitten' } ]))
  const factor = makeRequestFactor()
  address(spec, factor)
  t.true(runtime.calledOnce)
})

test.serial('runtime query variable', t => {
  const spec = makeRequestSpec()
  spec.state.address.variable = false
  spec.state.address.variableStart = false
  spec.state.query.variable = true
  /* eslint-disable-next-line no-template-curly-in-string */
  spec.query.set('search', new Set([ { value: '${search}' } ]))
  const factor = makeRequestFactor()
  address(spec, factor)
  t.true(runtime.calledOnce)
})
