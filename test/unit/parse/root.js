import test from 'ava'
import isolate from 'helper/isolate'
const [ root, { log } ] = isolate(test, 'parse/root', { log: 'parse/log' })

test.serial('success', t => {
  root({ log: {} })
  t.true(log.calledOnce)
})
