import test from 'ava'
import isolate from 'helper/isolate'
import { makeAssay } from 'aid'
const [ queryString, { queryItem } ] =
  isolate(test, 'validate/queryString', { queryItem: 'validate/queryItem' })

test.serial('invalid item 0', t => {
  t.throws(() => {
    queryString([ 5 ], 0, makeAssay())
  }, {
    name: 'InvalidQueryItem',
    message: 'Invalid query item (0:0): must be object'
  })
})

test.serial('invalid item 2', t => {
  t.throws(() => {
    queryString([ {}, {}, 5 ], 8, makeAssay())
  }, {
    name: 'InvalidQueryItem',
    message: 'Invalid query item (8:2): must be object'
  })
})

test.serial('valid 0', t => {
  queryString([], 0, makeAssay())
  t.true(queryItem.notCalled)
})

test.serial('valid 1', t => {
  queryString([ {} ], 0, makeAssay())
  t.true(queryItem.calledOnce)
})

test.serial('valid 3', t => {
  queryString([ {}, {}, {} ], 0, makeAssay())
  t.true(queryItem.calledThrice)
})
