const test = require('ava')
const isolate = require('helper/isolate')
const { assay: makeAssay } = require('make')
const [checks, { check }] = isolate(test, 'validate/checks', {
  check: 'validate/check',
})

test.serial('invalid check 0', t => {
  t.throws(
    () => {
      checks([5], 0, makeAssay())
    },
    {
      name: 'InvalidCheck',
      message: 'Check must be a plain object',
    }
  )
})

test.serial('invalid check 2', t => {
  t.throws(
    () => {
      checks([{}, {}, 5], 8, makeAssay())
    },
    {
      name: 'InvalidCheck',
      message: 'Check must be a plain object',
    }
  )
})

test.serial('valid 0', t => {
  checks([], 0, makeAssay())
  t.true(check.notCalled)
})

test.serial('valid 1', t => {
  checks([{}], 0, makeAssay())
  t.true(check.calledOnce)
})

test.serial('valid 3', t => {
  checks([{}, {}, {}], 0, makeAssay())
  t.true(check.calledThrice)
})
