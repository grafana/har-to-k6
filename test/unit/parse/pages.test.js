const test = require('ava')
const isolate = require('helper/isolate')
const { result: makeResult } = require('make')
const [pages, { page }] = isolate(test, 'parse/pages', { page: 'parse/page' })

test.serial('0', t => {
  const result = makeResult()
  pages([], result)
  t.true(page.notCalled)
})

test.serial('1', t => {
  const result = makeResult()
  pages([{}], result)
  t.true(page.calledOnce)
})

test.serial('3', t => {
  const result = makeResult()
  pages([{}, {}, {}], result)
  t.true(page.calledThrice)
})
