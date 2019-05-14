import test from 'ava'
import Regex from 'parse/checkVariant/Regex'
import { CheckSubject } from 'enum'

test('basic', t => {
  const item = {}
  Regex({
    subject: CheckSubject.ResponseBody,
    expression: 'Found \\d+ entr(y|ies)'
  }, item)
  t.deepEqual(item, {
    subject: CheckSubject.ResponseBody,
    expression: 'Found \\d+ entr(y|ies)'
  })
})

test('flags', t => {
  const item = {}
  Regex({
    subject: CheckSubject.ResponseBody,
    expression: 'logged in',
    flags: 'i'
  }, item)
  t.deepEqual(item, {
    subject: CheckSubject.ResponseBody,
    expression: 'logged in',
    flags: 'i'
  })
})
