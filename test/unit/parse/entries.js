import test from 'ava'
import isolate from 'helper/isolate'
import { makeResult } from 'aid'
const [ entries, { entry } ] =
  isolate(test, 'parse/entries', { entry: 'parse/entry' })

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
