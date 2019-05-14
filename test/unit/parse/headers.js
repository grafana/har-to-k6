import test from 'ava'
import isolate from 'helper/isolate'
const [ headers, { header } ] =
  isolate(test, 'parse/headers', { header: 'parse/header' })

function makeSpec () {
  return new Map()
}

test.serial('empty', t => {
  headers([], makeSpec())
  t.true(header.notCalled)
})

test.serial('1', t => {
  headers([ {} ], makeSpec())
  t.true(header.calledOnce)
})

test.serial('3', t => {
  headers([ {}, {}, {} ], makeSpec())
  t.true(header.calledThrice)
})
