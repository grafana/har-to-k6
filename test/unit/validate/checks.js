import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import { makeAssay } from 'aid'
const check = sinon.stub()
let checks

test.before(t => {
  mockRequire('../../../src/validate/check', check)
  checks = require('validate/checks')
})

test.afterEach.always(t => {
  check.reset()
})

test.serial('invalid check 0', t => {
  t.throws(() => {
    checks([ 5 ], 0, makeAssay())
  }, {
    name: 'InvalidCheck',
    message: 'Invalid check (0:0): must be object'
  })
})

test.serial('invalid check 2', t => {
  t.throws(() => {
    checks([ {}, {}, 5 ], 8, makeAssay())
  }, {
    name: 'InvalidCheck',
    message: 'Invalid check (8:2): must be object'
  })
})

test.serial('valid 0', t => {
  checks([], 0, makeAssay())
  t.true(check.notCalled)
})

test.serial('valid 1', t => {
  checks([ {} ], 0, makeAssay())
  t.true(check.calledOnce)
})

test.serial('valid 3', t => {
  checks([ {}, {}, {} ], 0, makeAssay())
  t.true(check.calledThrice)
})
