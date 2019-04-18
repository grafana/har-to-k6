import test from 'ava'
import isolate from 'helper/isolate'
const [ items, { item } ] =
  isolate(test, 'render/chain/items', { item: 'render/chain/item' })

test.serial('empty', t => {
  const result = items([])
  t.is(result, null)
  t.true(item.notCalled)
})

test.serial('1', t => {
  item.onFirstCall().returns(`.filter(item => item)`)
  const result = items([ {} ])
  t.true(item.calledOnce)
  t.is(result, `.filter(item => item)`)
})

test.serial('3', t => {
  item.onFirstCall().returns(`.map(item => process(item))`)
  item.onSecondCall().returns(`.filter(item => item)`)
  item.onThirdCall().returns(`.join('\\n')`)
  const result = items([ {}, {}, {} ])
  t.true(item.calledThrice)
  t.is(result, '' +
`.map(item => process(item))
.filter(item => item)
.join('\\n')`)
})
