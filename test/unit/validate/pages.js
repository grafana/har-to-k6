import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import { makeAssay } from 'aid'
const page = sinon.stub()
let pages

test.before(t => {
  mockRequire('../../../src/validate/page', page)
  pages = require('validate/pages')
})

test.afterEach.always(t => {
  page.reset()
})

test.serial('invalid page 0', t => {
  t.throws(() => {
    pages([ 5 ], makeAssay())
  }, {
    name: 'InvalidPage',
    message: 'Invalid page (0): must be object'
  })
})

test.serial('invalid page 2', t => {
  t.throws(() => {
    pages([ {}, {}, 5 ], makeAssay())
  }, {
    name: 'InvalidPage',
    message: 'Invalid page (2): must be object'
  })
})

test.serial('valid 0', t => {
  t.notThrows(() => {
    pages([], makeAssay())
  })
  t.true(page.notCalled)
})

test.serial('valid 1', t => {
  t.notThrows(() => {
    pages([ {} ], makeAssay())
  })
  t.true(page.calledOnce)
})

test.serial('valid 3', t => {
  t.notThrows(() => {
    pages([ {}, {}, {} ], makeAssay())
  })
  t.true(page.calledThrice)
})
