import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import { makeAssay } from 'aid'
const queryItem = sinon.stub()
let queryString

test.before(t => {
  mockRequire('../../../src/validate/queryItem', queryItem)
  queryString = require('validate/queryString')
})

test.afterEach.always(t => {
  queryItem.reset()
})

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
  t.notThrows(() => {
    queryString([], 0, makeAssay())
  })
})

test.serial('valid 1', t => {
  t.notThrows(() => {
    queryString([ {} ], 0, makeAssay())
  })
})

test.serial('valid 3', t => {
  t.notThrows(() => {
    queryString([ {}, {}, {} ], 0, makeAssay())
  })
})
