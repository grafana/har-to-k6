import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
const log = sinon.stub()
let root

test.before(t => {
  mockRequire('../../../src/parse/log', log)
  root = require('parse/root')
})

test.afterEach.always(t => {
  log.reset()
})

test.serial('success', t => {
  root({ log: {} })
  t.true(log.calledOnce)
})