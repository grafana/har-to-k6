const test = require('ava')
const computed = require('string/check/name/computed')
const { CheckCondition, CheckSubject, CheckType } = require('enum')

test('JSONPath', t => {
  const name = computed({
    type: CheckType.JSONPath,
    expression: '$.result.token',
  })
  t.is(name, '$.result.token exists')
})

test('JSONPathValue', t => {
  const name = computed({
    type: CheckType.JSONPathValue,
    expression: '$.user.id',
    condition: CheckCondition.Equals,
    value: '8734',
  })
  t.is(name, '$.user.id equals 8734')
})

test('Regex', t => {
  const name = computed({
    type: CheckType.Regex,
    subject: CheckSubject.HttpStatusCode,
    expression: '2\\d\\d',
  })
  t.is(name, 'status matches /2\\d\\d/')
})

test('Text', t => {
  const name = computed({
    type: CheckType.Text,
    subject: CheckSubject.ResponseBody,
    condition: CheckCondition.StartsWith,
    value: 'Success',
  })
  t.is(name, 'body starts with Success')
})
