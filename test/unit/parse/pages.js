import test from 'ava'
import isolate from 'helper/isolate'
import { makeResult } from 'aid'
const [ pages, { page } ] =
  isolate(test, 'parse/pages', { page: 'parse/page' })

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
