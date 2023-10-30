const test = require('ava')
const isolate = require('helper/isolate')
const { assay: makeAssay } = require('make')
const [pages, { page }] = isolate(test, 'validate/pages', {
  page: 'validate/page',
})

test.serial('invalid page 0', t => {
  t.throws(
    () => {
      pages([5], makeAssay())
    },
    {
      name: 'InvalidPage',
      message: 'Page must be a plain object',
    }
  )
})

test.serial('invalid page 2', t => {
  t.throws(
    () => {
      pages([{}, {}, 5], makeAssay())
    },
    {
      name: 'InvalidPage',
      message: 'Page must be a plain object',
    }
  )
})

test.serial('valid 0', t => {
  pages([], makeAssay())
  t.true(page.notCalled)
})

test.serial('valid 1', t => {
  pages([{}], makeAssay())
  t.true(page.calledOnce)
})

test.serial('valid 3', t => {
  pages([{}, {}, {}], makeAssay())
  t.true(page.calledThrice)
})
