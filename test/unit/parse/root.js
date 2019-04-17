import test from 'ava'
import isolate from 'helper/isolate'
import { result as makeResult } from 'make'
const [ root, { log } ] = isolate(test, 'parse/root', { log: 'parse/log' })

test.serial('success', t => {
  root({ log: {} }, makeResult())
  t.true(log.calledOnce)
})
