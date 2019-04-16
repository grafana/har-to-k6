import test from 'ava'
import isolate from 'helper/isolate'
const [ items, { item, order } ] =
  isolate(test, 'render/object/items', {
    item: 'render/object/item',
    order: 'render/object/order'
  })

test.serial('empty', t => {
  const result = items([])
  t.is(result, null)
})

test.serial('1', t => {
  item.returns('token: "abc123"')
  const result = items([ {} ])
  t.is(result, 'token: "abc123"')
})

test.serial('3', t => {
  item.onFirstCall().returns('Accept: "*/*", // Accept everything')
  item.onSecondCall().returns('Authorization: "Bearer abc123",')
  item.onThirdCall().returns('' +
`/*
 * Ask server to process CSV
 * Exercises import logic
 */
Content-Type: "text/csv"`)
  const result = items([ {}, {}, {} ])
  t.is(result, '' +
`Accept: "*/*", // Accept everything
Authorization: "Bearer abc123",
/*
 * Ask server to process CSV
 * Exercises import logic
 */
Content-Type: "text/csv"`)
})

test.serial('arg unchanged', t => {
  const specs = [ {} ]
  items(specs)
  t.not(order.firstCall.args[0], specs)
})
