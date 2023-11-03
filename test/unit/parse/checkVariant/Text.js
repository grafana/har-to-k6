const test = require('ava')
const Text = require('parse/checkVariant/Text')
const { CheckCondition, CheckSubject } = require('enum')

test('basic', t => {
  const item = {}
  Text(
    {
      subject: CheckSubject.ResponseBody,
      condition: CheckCondition.Contains,
      value: 'Logged in',
    },
    item
  )
  t.deepEqual(item, {
    subject: CheckSubject.ResponseBody,
    condition: CheckCondition.Contains,
    value: 'Logged in',
  })
})
