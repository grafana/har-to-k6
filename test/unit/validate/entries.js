import test from 'ava'
import isolate from 'helper/isolate'
import { assay as makeAssay } from 'make'
const [ entries, { entry } ] =
  isolate(test, 'validate/entries', { entry: 'validate/entry' })

test.serial('invalid entry 0', t => {
  t.throws(() => {
    entries([ 5 ], makeAssay())
  }, {
    name: 'InvalidEntry',
    message: 'Invalid entry (0): must be object'
  })
})

test.serial('invalid entry 2', t => {
  t.throws(() => {
    entries([ {}, {}, 5 ], makeAssay())
  }, {
    name: 'InvalidEntry',
    message: 'Invalid entry (2): must be object'
  })
})

test.serial('valid 0', t => {
  entries([], makeAssay())
  t.true(entry.notCalled)
})

test.serial('valid 1', t => {
  entries([ {} ], makeAssay())
  t.true(entry.calledOnce)
})

test.serial('valid 3', t => {
  entries([ {}, {}, {} ], makeAssay())
  t.true(entry.calledThrice)
})
