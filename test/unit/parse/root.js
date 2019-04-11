import test from 'ava'
import isolate from 'helper/isolate'
import { makeResult } from 'aid'
const [ root, { log } ] = isolate(test, 'parse/root', { log: 'parse/log' })

test.serial('success', t => {
  root({ log: {} }, makeResult())
  t.true(log.calledOnce)
})
