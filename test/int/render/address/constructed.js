import test from 'ava'
import isolate from 'helper/isolate'
import {
  requestFactor as makeRequestFactor,
  requestSpec as makeRequestSpec
} from 'make'
const [ constructed, { string } ] =
  isolate(test, 'render/address/constructed', { string: 'render/string' })

test.serial('1', t => {
  const spec = makeRequestSpec()
  spec.address = 'http://example.com'
  spec.query.set('first', new Set([ { value: 'one' } ]))
  const factor = makeRequestFactor()
  constructed(spec, factor)
  t.is(
    string.firstCall.args[0],
    'http://example.com/?first=one'
  )
})

test.serial('3', t => {
  const spec = makeRequestSpec()
  spec.address = 'http://example.com'
  spec.query.set('first', new Set([ { value: 'one' } ]))
  spec.query.set('second', new Set([ { value: 'two' } ]))
  spec.query.set('third', new Set([ { value: 'three' } ]))
  const factor = makeRequestFactor()
  constructed(spec, factor)
  t.is(
    string.firstCall.args[0],
    'http://example.com/?first=one&second=two&third=three'
  )
})

test.serial('plural', t => {
  const spec = makeRequestSpec()
  spec.address = 'http://example.com'
  spec.query.set('search', new Set([
    { value: 'kitten' },
    { value: 'puppy' },
    { value: 'quokka' }
  ]))
  const factor = makeRequestFactor()
  constructed(spec, factor)
  t.is(
    string.firstCall.args[0],
    'http://example.com/?search=kitten&search=puppy&search=quokka'
  )
})
