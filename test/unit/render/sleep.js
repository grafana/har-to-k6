import test from 'ava'
import sleep from 'render/sleep'

test('number', (t) => {
  const result = sleep(1200)
  t.is(result, 'sleep(1.2);')
})

test('zero', (t) => {
  const result = sleep(0)
  t.is(result, 'sleep(0);')
})
