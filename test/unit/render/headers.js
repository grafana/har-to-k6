import test from 'ava'
import isolate from 'helper/isolate'
const [ headers, { header, object } ] =
  isolate(test, 'render/headers', {
    header: 'render/header',
    object: 'render/object'
  })

test.serial('empty', t => {
  const result = headers(new Map())
  t.is(result, null)
})

test.serial('1', t => {
  const rendered = Symbol('rendered')
  object.returns(rendered)
  const spec = new Map()
    .set('Content-Type', new Set([ { value: 'text/plain' } ]))
  const result = headers(spec)
  t.is(result, rendered)
  t.true(header.calledOnce)
  t.true(object.calledOnce)
})

test.serial('3', t => {
  const rendered = Symbol('rendered')
  object.returns(rendered)
  const spec = new Map()
    .set('Content-Type', new Set([ { value: 'text/plain' } ]))
    .set('Accept', new Set([ { value: '*/*' } ]))
    .set('Accept-Encoding', new Set([ { value: 'gzip' } ]))
  const result = headers(spec)
  t.is(result, rendered)
  t.true(header.calledThrice)
  t.true(object.calledOnce)
})
