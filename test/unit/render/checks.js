import test from 'ava'
import isolate from 'helper/isolate'
const [ checks, { check, object } ] =
  isolate(test, 'render/checks', {
    check: 'render/check',
    object: 'render/object'
  })

test.serial('empty', t => {
  const result = checks(new Map())
  t.is(result, null)
})

test.serial('1', t => {
  object.returns('rendered')
  const spec = new Map()
    .set('$.token exists', new Set([ {} ]))
  const result = checks(spec)
  t.is(result, 'rendered')
  t.true(check.calledOnce)
  t.true(object.calledOnce)
})

test.serial('3', t => {
  object.returns('rendered')
  const spec = new Map()
    .set('$.status is success', new Set([ {} ]))
    .set('$.results is 7', new Set([ {} ]))
    .set('$.result[0].name is Kitten', new Set([ {} ]))
  const result = checks(spec)
  t.is(result, 'rendered')
  t.true(check.calledThrice)
  t.true(object.calledOnce)
})
