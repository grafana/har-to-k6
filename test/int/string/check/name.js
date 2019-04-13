import test from 'ava'
import checkName from 'string/check/name'
import { CheckCondition, CheckSubject, CheckType } from 'enum'

test('JSONPath', t => {
  const name = checkName({
    type: CheckType.JSONPath,
    expression: '$.result.token'
  })
  t.is(name, '$.result.token exists')
})

test('JSONPathValue', t => {
  const name = checkName({
    type: CheckType.JSONPathValue,
    expression: '$.user.id',
    condition: CheckCondition.Equals,
    value: '8734'
  })
  t.is(name, '$.user.id equals 8734')
})

test('Regex', t => {
  const name = checkName({
    type: CheckType.Regex,
    subject: CheckSubject.HttpStatusCode,
    expression: '2\\d\\d'
  })
  t.is(name, 'status matches /2\\d\\d/')
})

test('Text', t => {
  const name = checkName({
    type: CheckType.Text,
    subject: CheckSubject.ResponseBody,
    condition: CheckCondition.StartsWith,
    value: 'Success'
  })
  t.is(name, 'body starts with Success')
})
