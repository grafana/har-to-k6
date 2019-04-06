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

test.serial('0', t => {
  const result = makeResult()
  entries([], result)
  t.true(entry.notCalled)
})

test.serial('1', t => {
  const result = makeResult()
  entries([ {} ], result)
  t.true(entry.calledOnce)
})

test.serial('3', t => {
  const result = makeResult()
  entries([ {}, {}, {} ], result)
  t.true(entry.calledThrice)
})
