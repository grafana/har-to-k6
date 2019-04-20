import test from 'ava'
import isolate from 'helper/isolate'
const [ composite, { content } ] =
  isolate(test, 'render/template/composite', {
    content: 'render/template/content'
  })

test.serial('empty', t => {
  t.is(composite([]), '``')
})

test.serial('1', t => {
  content.callsFake(value => value)
  t.is(composite([ 'GET' ]), '`GET`')
})

test.serial('3', t => {
  content.callsFake(value => value)
  t.is(composite([ 'GET', 'POST', 'HEAD' ]), '`GETPOSTHEAD`')
})

test.serial('empty item', t => {
  content.callsFake(value => value)
  t.is(composite([ 'GET', '', 'HEAD' ]), '`GETHEAD`')
})

test.serial('delimiter', t => {
  content.callsFake(value => value)
  t.is(composite([ 'GET', '', 'HEAD' ], ','), '`GET,,HEAD`')
})
