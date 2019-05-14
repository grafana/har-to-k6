import test from 'ava'
import Text from 'parse/checkVariant/Text'
import { CheckCondition, CheckSubject } from 'enum'

test('basic', t => {
  const item = {}
  Text({
    subject: CheckSubject.ResponseBody,
    condition: CheckCondition.Contains,
    value: 'Logged in'
  }, item)
  t.deepEqual(item, {
    subject: CheckSubject.ResponseBody,
    condition: CheckCondition.Contains,
    value: 'Logged in'
  })
})
