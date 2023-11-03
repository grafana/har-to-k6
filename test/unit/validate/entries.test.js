const test = require('ava')
const isolate = require('helper/isolate')
const { assay: makeAssay } = require('make')
const [entries, { entry }] = isolate(test, 'validate/entries', {
  entry: 'validate/entry',
})

test.serial('invalid entry 0', t => {
  t.throws(
    () => {
      entries([5], makeAssay())
    },
    {
      name: 'InvalidEntry',
      message: `Entry must be a plain object`,
    }
  )
})

test.serial('invalid entry 2', t => {
  t.throws(
    () => {
      entries([{}, {}, 5], makeAssay())
    },
    {
      name: 'InvalidEntry',
      message: `Entry must be a plain object`,
    }
  )
})

test.serial('valid 0', t => {
  entries([], makeAssay())
  t.true(entry.notCalled)
})

test.serial('valid 1', t => {
  entries([{}], makeAssay())
  t.true(entry.calledOnce)
})

test.serial('valid 3', t => {
  entries([{}, {}, {}], makeAssay())
  t.true(entry.calledThrice)
})
