import test from 'ava'
import isolate from 'helper/isolate'
import { assay as makeAssay } from 'make'
const [ variables, { variable } ] =
  isolate(test, 'validate/variables', { variable: 'validate/variable' })

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
