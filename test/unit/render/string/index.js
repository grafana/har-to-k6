import test from 'ava'
import isolate from 'helper/isolate'
const [ string, { composite, prime } ] =
  isolate(test, 'render/string', {
    composite: 'render/string/composite',
    prime: 'render/string/prime'
  })

test.serial('prime', t => {
  string('token')
  t.true(prime.calledOnce)
  t.true(composite.notCalled)
})

test.serial('composite', t => {
  string([ 'GET', 'POST', 'HEAD' ])
  t.true(composite.calledOnce)
  t.true(prime.notCalled)
})

test.serial('composite delimiter', t => {
  string([ 'GET', 'POST', 'HEAD' ], ',')
  t.is(composite.firstCall.args[1], ',')
})
