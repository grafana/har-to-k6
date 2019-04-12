import test from 'ava'
import JSONPathValue from 'string/check/name/JSONPathValue'
import { CheckCondition } from 'enum'

test('title equals', t => {
  const name = JSONPathValue({
    expression: '$.store.book[*].title',
    condition: CheckCondition.Equals,
    value: 'The Third Principia'
  })
  t.is(name, '$.store.book[*].title equals The Third Principia')
})

test('author contains', t => {
  const name = JSONPathValue({
    expression: '$.store.book[*].author',
    condition: CheckCondition.Contains,
    value: 'A. Square'
  })
  t.is(name, '$.store.book[*].author contains A. Square')
})
