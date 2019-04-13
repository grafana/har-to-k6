import test from 'ava'
import JSONPathValue from 'parse/checkVariant/JSONPathValue'
import { CheckCondition } from 'enum'

test('basic', t => {
  const item = {}
  JSONPathValue({
    expression: '$.author',
    condition: CheckCondition.Equals,
    value: 'A. Square'
  }, item)
  t.deepEqual(item, {
    expression: '$.author',
    condition: CheckCondition.Equals,
    value: 'A. Square'
  })
})
