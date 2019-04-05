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

test.serial('invalid page 0', t => {
  t.throws(() => {
    pages([ 5 ])
  }, {
    name: 'InvalidPage',
    message: 'Invalid page (0): must be object'
  })
})

test.serial('invalid page 2', t => {
  t.throws(() => {
    pages([ {}, {}, 5 ])
  }, {
    name: 'InvalidPage',
    message: 'Invalid page (2): must be object'
  })
})

test.serial('success 0', t => {
  const result = makeResult()
  pages([], result)
  t.true(page.notCalled)
})

test.serial('success 1', t => {
  const result = makeResult()
  pages([ {} ], result)
  t.true(page.calledOnce)
})

test.serial('success 3', t => {
  const result = makeResult()
  pages([ {}, {}, {} ], result)
  t.true(page.calledThrice)
})
