import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import { makeAssay } from 'aid'
const header = sinon.stub()
let headers

test.before(t => {
  mockRequire('../../../src/validate/header', header)
  headers = require('validate/headers')
})

test.afterEach.always(t => {
  header.reset()
})

test.serial('invalid header 0', t => {
  t.throws(() => {
    headers([ 5 ], 0, makeAssay())
  }, {
    name: 'InvalidHeader',
    message: 'Invalid header (0:0): must be object'
  })
})

test.serial('Invalid header 2', t => {
  t.throws(() => {
    headers([ {}, {}, 5 ], 8, makeAssay())
  }, {
    name: 'InvalidHeader',
    message: 'Invalid header (8:2): must be object'
  })
})

test.serial('valid 0', t => {
  t.notThrows(() => {
    headers([], 0, makeAssay())
  })
})

test.serial('valid 1', t => {
  t.notThrows(() => {
    headers([ {} ], 0, makeAssay())
  })
})

test.serial('valid 3', t => {
  t.notThrows(() => {
    headers([ {}, {}, {} ], 0, makeAssay())
  })
})
