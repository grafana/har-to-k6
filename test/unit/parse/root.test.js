const test = require('ava')
const isolate = require('helper/isolate')
const { result: makeResult } = require('make')
const [root, { log }] = isolate(test, 'parse/root', { log: 'parse/log' })

test.serial('success', t => {
  root({ log: {} }, makeResult())
  t.true(log.calledOnce)
})
