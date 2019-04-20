import test from 'ava'
import isolate from 'helper/isolate'
const [ string, { prime } ] =
  isolate(test, 'render/string', { prime: 'render/string/prime' })

test.serial('prime', t => {
  string('token')
  t.true(prime.calledOnce)
})
