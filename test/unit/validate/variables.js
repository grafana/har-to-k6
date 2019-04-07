import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import { makeAssay } from 'aid'
const variable = sinon.stub()
let variables

test.before(t => {
  mockRequire('../../../src/validate/variable', variable)
  variables = require('validate/variables')
})

test.afterEach.always(t => {
  variable.reset()
})

test.serial('invalid variable 0', t => {
  t.throws(() => {
    variables([ 5 ], 0, makeAssay())
  }, {
    name: 'InvalidVariable',
    message: 'Invalid variable (0:0): must be object'
  })
})

test.serial('invalid variable 2', t => {
  t.throws(() => {
    variables([ {}, {}, 5 ], 8, makeAssay())
  }, {
    name: 'InvalidVariable',
    message: 'Invalid variable (8:2): must be object'
  })
})

test.serial('valid 0', t => {
  variables([], 0, makeAssay())
  t.true(variable.notCalled)
})

test.serial('valid 1', t => {
  variables([ {} ], 0, makeAssay())
  t.true(variable.calledOnce)
})

test.serial('valid 3', t => {
  variables([ {}, {}, {} ], 0, makeAssay())
  t.true(variable.calledThrice)
})
