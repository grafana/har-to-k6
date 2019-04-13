import test from 'ava'
import isolate from 'helper/isolate'
const [ checks, { check } ] =
  isolate(test, 'parse/checks', { check: 'parse/check' })

function makeSpec () {
  return new Map()
}

test.serial('empty', t => {
  checks([], makeSpec())
  t.true(check.notCalled)
})

test.serial('1', t => {
  checks([ {} ], makeSpec())
  t.true(check.calledOnce)
})

test.serial('3', t => {
  checks([ {}, {}, {} ], makeSpec())
  t.true(check.calledThrice)
})
