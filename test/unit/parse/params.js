import test from 'ava'
import isolate from 'helper/isolate'
const [ params, { param } ] =
  isolate(test, 'parse/params', { param: 'parse/param' })

function makeSpec () {
  return new Map()
}

test.serial('empty', t => {
  params([], makeSpec())
  t.true(param.notCalled)
})

test.serial('1', t => {
  params([ {} ], makeSpec())
  t.true(param.calledOnce)
})

test.serial('3', t => {
  params([ {}, {}, {} ], makeSpec())
  t.true(param.calledThrice)
})
