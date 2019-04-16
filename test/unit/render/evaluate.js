import test from 'ava'
import isolate from 'helper/isolate'
const [ evaluate, { string } ] =
  isolate(test, 'render/evaluate', { string: 'render/string' })

test.serial('basic', t => {
  string.returns('"token"')
  t.is(evaluate('token'), `vars["token"]`)
})
