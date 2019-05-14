import test from 'ava'
import isolate from 'helper/isolate'
const [ item, { comment, key } ] =
  isolate(test, 'render/object/item', {
    comment: 'render/comment',
    key: 'render/object/key'
  })

test.serial('minimal', t => {
  key.returns('token')
  const result = item({ name: 'token', value: '"abc123"' }, true)
  t.is(result, 'token: "abc123"')
})

test.serial('comment inline', t => {
  key.returns('token')
  comment.returns('// Authenticate')
  const result = item({
    name: 'token',
    value: '"abc123"',
    comment: 'Authenticate'
  }, true)
  t.is(result, 'token: "abc123" // Authenticate')
})

test.serial('comment multiline', t => {
  key.returns('query')
  comment.returns('' +
`/*
 * Send query
 * Exercises search logic
 */`)
  const result = item({
    name: 'query',
    value: '"kittens"',
    comment: 'Send query\nExercises search logic'
  }, true)
  t.is(result, '' +
`/*
 * Send query
 * Exercises search logic
 */
query: "kittens"`)
})

test.serial('inner', t => {
  key.returns('token')
  const result = item({ name: 'token', value: '"abc123"' }, false)
  t.is(result, 'token: "abc123",')
})

test.serial('inner comment', t => {
  key.returns('token')
  comment.returns('// Authenticate')
  const result = item({
    name: 'token',
    value: '"abc123"',
    comment: 'Authenticate'
  }, false)
  t.is(result, 'token: "abc123", // Authenticate')
})
