const test = require('ava')
const subject = require('string/check/subject')
const { extrinsic } = require('aid')
const { CheckSubject } = require('enum')

test('ResponseBody', t => {
  t.is(subject(CheckSubject.ResponseBody), 'body')
})

test('ResponseHeaders', t => {
  t.is(subject(CheckSubject.ResponseHeaders), 'header')
})

test('HttpStatusCode', t => {
  t.is(subject(CheckSubject.HttpStatusCode), 'status')
})

test('invalid', t => {
  t.throws(
    () => {
      subject(extrinsic(CheckSubject))
    },
    { name: 'UnrecognizedCheckSubject' }
  )
})
