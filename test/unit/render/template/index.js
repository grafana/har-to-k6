import test from 'ava'
import isolate from 'helper/isolate'
const [ template, { composite, prime } ] =
  isolate(test, 'render/template', {
    composite: 'render/template/composite',
    prime: 'render/template/prime'
  })

test.serial('prime', t => {
  template('token')
  t.true(prime.calledOnce)
  t.true(composite.notCalled)
})

test.serial('composite', t => {
  template([ 'GET', 'POST', 'HEAD' ])
  t.true(composite.calledOnce)
  t.true(prime.notCalled)
})

test.serial('composite delimiter', t => {
  template([ 'GET', 'POST', 'HEAD' ], ',')
  t.is(composite.firstCall.args[1], ',')
})
