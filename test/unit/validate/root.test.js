const test = require('ava')
const isolate = require('helper/isolate')
const { assay: makeAssay } = require('make')
const [root, { log }] = isolate(test, 'validate/root', { log: 'validate/log' })

test.serial('missing root', t => {
  t.throws(
    () => {
      root(null, makeAssay())
    },
    { name: 'MissingRoot' }
  )
})

test.serial('missing log', t => {
  t.throws(
    () => {
      root({}, makeAssay())
    },
    { name: 'MissingLog' }
  )
})

test.serial('invalid log', t => {
  t.throws(
    () => {
      root({ log: 5 }, makeAssay())
    },
    { name: 'InvalidLog' }
  )
})

test.serial('valid', t => {
  root({ log: {} }, makeAssay())
  t.true(log.calledOnce)
})
