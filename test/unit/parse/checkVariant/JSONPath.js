const test = require('ava')
const JSONPath = require('parse/checkVariant/JSONPath')

test('basic', t => {
  const item = {}
  JSONPath({ expression: 'token' }, item)
  t.deepEqual(item, { expression: 'token' })
})
