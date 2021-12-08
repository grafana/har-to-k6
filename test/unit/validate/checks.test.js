import test from 'ava'
import isolate from 'helper/isolate'
import { assay as makeAssay } from 'make'
const [checks, { check }] = isolate(test, 'validate/checks', {
  check: 'validate/check',
})

test.serial('invalid check 0', (t) => {
  t.throws(
    () => {
      checks([5], 0, makeAssay())
    },
    {
      name: 'InvalidCheck',
      message: 'Check must be an object',
    }
  )
})

test.serial('invalid check 2', (t) => {
  t.throws(
    () => {
      checks([{}, {}, 5], 8, makeAssay())
    },
    {
      name: 'InvalidCheck',
      message: 'Check must be an object',
    }
  )
})

test.serial('valid 0', (t) => {
  checks([], 0, makeAssay())
  t.true(check.notCalled)
})

test.serial('valid 1', (t) => {
  checks([{}], 0, makeAssay())
  t.true(check.calledOnce)
})

test.serial('valid 3', (t) => {
  checks([{}, {}, {}], 0, makeAssay())
  t.true(check.calledThrice)
})
