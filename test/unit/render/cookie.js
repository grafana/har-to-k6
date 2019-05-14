import test from 'ava'
import isolate from 'helper/isolate'
const [ cookie, { text } ] =
  isolate(test, 'render/cookie', { text: 'render/text' })

test.serial('basic', t => {
  text.returns('""')
  const result = cookie('session', {})
  t.deepEqual(result, {
    name: 'session',
    value: '""',
    comment: null
  })
})

test.serial('value', t => {
  text.returns('"abc123"')
  const result = cookie('session', { value: 'abc123' })
  t.deepEqual(result, {
    name: 'session',
    value: '"abc123"',
    comment: null
  })
})

test.serial('comment', t => {
  text.returns('""')
  const result = cookie('session', { comment: 'Start without a session' })
  t.deepEqual(result, {
    name: 'session',
    value: '""',
    comment: 'Start without a session'
  })
})
