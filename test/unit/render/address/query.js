import test from 'ava'
import isolate from 'helper/isolate'
import { requestFactor as makeRequestFactor } from 'make'
const [ query, { chain, text } ] =
  isolate(test, 'render/address/query', {
    chain: 'render/chain',
    text: 'render/text'
  })

test.serial('empty', t => {
  const factor = makeRequestFactor()
  query(new Map(), factor)
  t.deepEqual(factor.pre, [])
})

test.serial('1', t => {
  chain.returns(`  .addQuery("search", "kitten")`)
  const factor = makeRequestFactor()
  const spec = new Map()
    .set('search', new Set([ { value: 'kitten' } ]))
  query(spec, factor)
  t.deepEqual(factor.pre, [ '' +
`address
  .addQuery("search", "kitten");` ])
  t.is(text.firstCall.args[0], 'search')
  t.is(text.secondCall.args[0], 'kitten')
})

test.serial('3', t => {
  chain.returns('' +
`  .addQuery("search", "kitten")
  .addQuery("search", "puppy")
  .addQuery("search", "quokka")`)
  const factor = makeRequestFactor()
  const spec = new Map()
    .set('search', new Set([
      { value: 'kitten' },
      { value: 'puppy' },
      { value: 'quokka' }
    ]))
  query(spec, factor)
  t.deepEqual(factor.pre, [ '' +
`address
  .addQuery("search", "kitten")
  .addQuery("search", "puppy")
  .addQuery("search", "quokka");` ])
  const args = text.getCalls().map(call => call.args[0])
  t.is(args[0], 'search')
  t.is(args[1], 'kitten')
  t.is(args[2], 'search')
  t.is(args[3], 'puppy')
  t.is(args[4], 'search')
  t.is(args[5], 'quokka')
})
