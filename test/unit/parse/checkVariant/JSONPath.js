import test from 'ava'
import JSONPath from 'parse/checkVariant/JSONPath'

test('basic', t => {
  const item = {}
  JSONPath({ expression: 'token' }, item)
  t.deepEqual(item, { expression: 'token' })
})
