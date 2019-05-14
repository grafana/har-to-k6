import test from 'ava'
import Text from 'string/check/name/Text'
import { CheckCondition, CheckSubject } from 'enum'

test('body contains', t => {
  const name = Text({
    subject: CheckSubject.ResponseBody,
    condition: CheckCondition.Contains,
    value: 'Logged in'
  })
  t.is(name, 'body contains Logged in')
})

test('status starts with', t => {
  const name = Text({
    subject: CheckSubject.HttpStatusCode,
    condition: CheckCondition.StartsWith,
    value: '2'
  })
  t.is(name, 'status starts with 2')
})
