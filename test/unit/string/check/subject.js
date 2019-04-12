import test from 'ava'
import subject from 'string/check/subject'
import { extrinsic } from 'aid'
import { CheckSubject } from 'enum'

test('ResponseBody', t => {
  t.is(subject(CheckSubject.ResponseBody), 'body')
})

test('ResponseHeaders', t => {
  t.is(subject(CheckSubject.ResponseHeaders), 'headers')
})

test('HttpStatusCode', t => {
  t.is(subject(CheckSubject.HttpStatusCode), 'status')
})

test('invalid', t => {
  t.throws(() => {
    subject(extrinsic(CheckSubject))
  }, { name: 'UnrecognizedCheckSubject' })
})
