import test from 'ava'
import isolate from 'helper/isolate'
const [ queryString, { queryItem } ] =
  isolate(test, 'parse/queryString', { queryItem: 'parse/queryItem' })

function makeSpec () {
  return new Map()
}

function makeState () {
  return {
    variable: false
  }
}

test.serial('empty', t => {
  queryString([], makeSpec(), makeState())
  t.true(queryItem.notCalled)
})

test.serial('1', t => {
  queryString([ {} ], makeSpec(), makeState())
  t.true(queryItem.calledOnce)
})

test.serial('3', t => {
  queryString([ {}, {}, {} ], makeSpec(), makeState())
  t.true(queryItem.calledThrice)
})
