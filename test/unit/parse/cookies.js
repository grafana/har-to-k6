import test from 'ava'
import isolate from 'helper/isolate'
const [ cookies, { cookie } ] =
  isolate(test, 'parse/cookies', { cookie: 'parse/cookie' })

function makeSpec () {
  return new Map()
}

test.serial('empty', t => {
  cookies([], makeSpec())
  t.true(cookie.notCalled)
})

test.serial('1', t => {
  cookies([ {} ], makeSpec())
  t.true(cookie.calledOnce)
})

test.serial('3', t => {
  cookies([ {}, {}, {} ], makeSpec())
  t.true(cookie.calledThrice)
})
