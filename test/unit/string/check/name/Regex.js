import test from 'ava'
import Regex from 'string/check/name/Regex'
import { CheckSubject } from 'enum'

test('basic', t => {
  const name = Regex({
    subject: CheckSubject.ResponseBody,
    expression: 'User .+ logged in'
  })
  t.is(name, 'body matches /User .+ logged in/')
})

test('flags', t => {
  const name = Regex({
    subject: CheckSubject.ResponseHeaders,
    expression: 'Server: .*apache.*',
    flags: 'i'
  })
  t.is(name, 'header matches /Server: .*apache.*/i')
})
