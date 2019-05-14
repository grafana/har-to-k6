import test from 'ava'
import isolate from 'helper/isolate'
const [ object, { items } ] =
  isolate(test, 'render/object', { items: 'render/object/items' })

test.serial('empty', t => {
  const result = object([])
  t.is(result, `{}`)
})

test.serial('1', t => {
  items.returns(`token: "abc123"`)
  const result = object([ {} ])
  t.is(result, '' +
`{
  token: "abc123"
}`)
})

test.serial('3', t => {
  items.returns('' +
`Accept: "*/*", // Accept everything
Authorization: "Bearer abc123",
/*
 * Ask server to process CSV
 * Exercises import logic
 */
Content-Type: "text/csv"`)
  const result = object([ {}, {}, {} ])
  t.is(result, '' +
`{
  Accept: "*/*", // Accept everything
  Authorization: "Bearer abc123",
  /*
   * Ask server to process CSV
   * Exercises import logic
   */
  Content-Type: "text/csv"
}`)
})
