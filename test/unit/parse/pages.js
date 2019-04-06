import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import { makeResult } from 'aid'
const page = sinon.stub()
let pages

test.before(t => {
  mockRequire('../../../src/parse/page', page)
  pages = require('parse/pages')
})

test.afterEach.always(t => {
  page.reset()
})

test.serial('0', t => {
  const result = makeResult()
  pages([], result)
  t.true(page.notCalled)
})

test.serial('1', t => {
  const result = makeResult()
  pages([ {} ], result)
  t.true(page.calledOnce)
})

test.serial('3', t => {
  const result = makeResult()
  pages([ {}, {}, {} ], result)
  t.true(page.calledThrice)
})
