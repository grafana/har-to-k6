import test from 'ava'
import isolate from 'helper/isolate'
const [ cookies, { cookie, object } ] =
  isolate(test, 'render/cookies', {
    cookie: 'render/cookie',
    object: 'render/object'
  })

test.serial('empty', t => {
  const result = cookies(new Map())
  t.is(result, null)
})

test.serial('1', t => {
  const rendered = Symbol('rendered')
  object.returns(rendered)
  const spec = new Map()
    .set('session', { value: 'abc123' })
  const result = cookies(spec)
  t.is(result, rendered)
  t.true(cookie.calledOnce)
  t.true(object.calledOnce)
})

test.serial('3', t => {
  const rendered = Symbol('rendered')
  object.returns(rendered)
  const spec = new Map()
    .set('session', { value: 'abc123' })
    .set('theme', { value: 'aqua' })
    .set('screen', { value: 'desktop' })
  const result = cookies(spec)
  t.is(result.rendered)
  t.true(cookie.calledThrice)
  t.true(object.calledOnce)
})
