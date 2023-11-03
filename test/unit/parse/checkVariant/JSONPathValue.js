const test = require('ava')
const JSONPathValue = require('parse/checkVariant/JSONPathValue')
const { CheckCondition } = require('enum')

test('basic', t => {
  const item = {}
  JSONPathValue(
    {
      expression: '$.author',
      condition: CheckCondition.Equals,
      value: 'A. Square',
    },
    item
  )
  t.deepEqual(item, {
    expression: '$.author',
    condition: CheckCondition.Equals,
    value: 'A. Square',
  })
})
