const test = require('ava')
const Regex = require('parse/checkVariant/Regex')
const { CheckSubject } = require('enum')

test('basic', t => {
  const item = {}
  Regex(
    {
      subject: CheckSubject.ResponseBody,
      expression: 'Found \\d+ entr(y|ies)',
    },
    item
  )
  t.deepEqual(item, {
    subject: CheckSubject.ResponseBody,
    expression: 'Found \\d+ entr(y|ies)',
  })
})

test('flags', t => {
  const item = {}
  Regex(
    {
      subject: CheckSubject.ResponseBody,
      expression: 'logged in',
      flags: 'i',
    },
    item
  )
  t.deepEqual(item, {
    subject: CheckSubject.ResponseBody,
    expression: 'logged in',
    flags: 'i',
  })
})
