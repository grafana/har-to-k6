import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import { makeAssay } from 'aid'
const log = sinon.stub()
let root

test.before(t => {
  mockRequire('../../../src/validate/log', log)
  root = require('validate/root')
})

test.afterEach.always(t => {
  log.reset()
})

test.serial('missing root', t => {
  t.throws(() => {
    root(null, makeAssay())
  }, { name: 'MissingRoot' })
})

test.serial('missing log', t => {
  t.throws(() => {
    root({}, makeAssay())
  }, { name: 'MissingLog' })
})

test.serial('invalid log', t => {
  t.throws(() => {
    root({ log: 5 }, makeAssay())
  }, { name: 'InvalidLog' })
})

test.serial('valid', t => {
  t.notThrows(() => {
    root({ log: {} }, makeAssay())
  })
  t.true(log.calledOnce)
})
