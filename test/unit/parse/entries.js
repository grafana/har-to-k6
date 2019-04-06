import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import { makeResult } from 'aid'
const entry = sinon.stub()
let entries

test.before(t => {
  mockRequire('../../../src/parse/entry', entry)
  entries = require('parse/entries')
})

test.afterEach.always(t => {
  entry.reset()
})

test.serial('invalid entry 0', t => {
  t.throws(() => {
    entries([ 5 ])
  }, {
    name: 'InvalidEntry',
    message: 'Invalid entry (0): must be object'
  })
})

test.serial('invalid entry 2', t => {
  t.throws(() => {
    entries([ {}, {}, 5 ])
  }, {
    name: 'InvalidEntry',
    message: 'Invalid entry (2): must be object'
  })
})

test.serial('success 0', t => {
  const result = makeResult()
  entries([], result)
  t.true(entry.notCalled)
})

test.serial('success 1', t => {
  const result = makeResult()
  entries([ {} ], result)
  t.true(entry.calledOnce)
})

test.serial('success 3', t => {
  const result = makeResult()
  entries([ {}, {}, {} ], result)
  t.true(entry.calledThrice)
})
