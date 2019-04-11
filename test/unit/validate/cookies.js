import test from 'ava'
import isolate from 'helper/isolate'
import { makeAssay } from 'aid'
const [ cookies, { cookie } ] =
  isolate(test, 'validate/cookies', { cookie: 'validate/cookie' })

test.serial('invalid cookie 0', t => {
  t.throws(() => {
    cookies([ 5 ], 0, makeAssay())
  }, {
    name: 'InvalidCookie',
    message: 'Invalid cookie (0:0): must be object'
  })
})

test.serial('invalid cookie 2', t => {
  t.throws(() => {
    cookies([ {}, {}, 5 ], 8, makeAssay())
  }, {
    name: 'InvalidCookie',
    message: 'Invalid cookie (8:2): must be object'
  })
})

test.serial('valid 0', t => {
  cookies([], 0, makeAssay())
  t.true(cookie.notCalled)
})

test.serial('valid 1', t => {
  cookies([ {} ], 0, makeAssay())
  t.true(cookie.calledOnce)
})

test.serial('valid 3', t => {
  cookies([ {}, {}, {} ], 0, makeAssay())
  t.true(cookie.calledThrice)
})
