const test = require('ava')
const Text = require('string/check/name/Text')
const { CheckCondition, CheckSubject } = require('enum')

test('body contains', t => {
  const name = Text({
    subject: CheckSubject.ResponseBody,
    condition: CheckCondition.Contains,
    value: 'Logged in',
  })
  t.is(name, 'body contains Logged in')
})

test('status starts with', t => {
  const name = Text({
    subject: CheckSubject.HttpStatusCode,
    condition: CheckCondition.StartsWith,
    value: '2',
  })
  t.is(name, 'status starts with 2')
})
