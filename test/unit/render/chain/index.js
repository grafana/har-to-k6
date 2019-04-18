import test from 'ava'
import isolate from 'helper/isolate'
const [ chain, { indent, items } ] =
  isolate(test, 'render/chain', {
    indent: 'render/indent',
    items: 'render/chain/items'
  })

test.serial('empty', t => {
  items.returns(null)
  const result = chain([])
  t.is(result, null)
})

test.serial('nonempty', t => {
  const rendered = Symbol('rendered')
  items.returns(`.filter(item => item)`)
  indent.returns(rendered)
  const result = chain([ {} ])
  t.is(result, rendered)
  t.true(items.calledOnce)
  t.true(indent.calledOnce)
  t.is(indent.firstCall.args[0], `.filter(item => item)`)
})
