const test = require('ava')
const isolate = require('helper/isolate')
const { result: makeResult } = require('make')
const [entries, { entry }] = isolate(test, 'parse/entries', {
  entry: 'parse/entry',
})

test.serial('0', t => {
  const result = makeResult()
  entries([], result)
  t.true(entry.notCalled)
})

test.serial('1', t => {
  const result = makeResult()
  entries([{}], result)
  t.true(entry.calledOnce)
})

test.serial('3', t => {
  const result = makeResult()
  entries([{}, {}, {}], result)
  t.true(entry.calledThrice)
})
