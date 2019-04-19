import test from 'ava'
import address from 'parse/state/address'
import { requestSpec as makeRequestSpec } from 'make'
import { AddressSpecies } from 'enum'

test('no variable', t => {
  const spec = makeRequestSpec()
  spec.address = 'http://example.com'
  address(spec)
  t.false(spec.state.address.variable)
  t.false(spec.state.address.variableStart)
})

test('variable inner', t => {
  const spec = makeRequestSpec()
  /* eslint-disable-next-line no-template-curly-in-string */
  spec.address = 'http://${host}'
  spec.state.query.variable = false
  address(spec)
  t.true(spec.state.address.variable)
  t.false(spec.state.address.variableStart)
})

test('variable start', t => {
  const spec = makeRequestSpec()
  /* eslint-disable-next-line no-template-curly-in-string */
  spec.address = '${location}'
  spec.state.query.variable = false
  address(spec)
  t.true(spec.state.address.variable)
  t.true(spec.state.address.variableStart)
})

test('fixed', t => {
  const spec = makeRequestSpec()
  spec.address = 'http://example.com'
  spec.state.query.variable = false
  address(spec)
  t.is(spec.state.address.species, AddressSpecies.Fixed)
})

test('constructed', t => {
  const spec = makeRequestSpec()
  spec.address = 'http://example.com'
  spec.query.set('search', new Set([ { value: 'kitten' } ]))
  spec.state.query.variable = false
  address(spec)
  t.is(spec.state.address.species, AddressSpecies.Constructed)
})

test('resolved', t => {
  const spec = makeRequestSpec()
  /* eslint-disable-next-line no-template-curly-in-string */
  spec.address = 'http://${host}'
  spec.state.query.variable = false
  address(spec)
  t.is(spec.state.address.species, AddressSpecies.Resolved)
})

test('runtime address variable start', t => {
  const spec = makeRequestSpec()
  /* eslint-disable-next-line no-template-curly-in-string */
  spec.address = '${location}'
  spec.state.query.variable = false
  address(spec)
  t.is(spec.state.address.species, AddressSpecies.Runtime)
})

test('runtime address variable + query', t => {
  const spec = makeRequestSpec()
  /* eslint-disable-next-line no-template-curly-in-string */
  spec.address = 'http://${host}'
  spec.query.set('search', new Set([ { value: 'kitten' } ]))
  spec.state.query.variable = false
  address(spec)
  t.is(spec.state.address.species, AddressSpecies.Runtime)
})

test('runtime query variable', t => {
  const spec = makeRequestSpec()
  spec.address = 'http://example.com'
  /* eslint-disable-next-line no-template-curly-in-string */
  spec.query.set('search', new Set([ { value: '${search}' } ]))
  spec.state.query.variable = true
  address(spec)
  t.is(spec.state.address.species, AddressSpecies.Runtime)
})
