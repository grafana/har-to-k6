import test from 'ava'
import creator from 'parse/creator'
import { makeResult } from 'aid'

test('creator name', t => {
  const result = makeResult()
  creator({ name: 'WebTracer' }, result)
  t.is(result.comment[0], 'Creator: WebTracer')
})

test('creator version', t => {
  const result = makeResult()
  creator({ name: 'WebTracer', version: '2' }, result)
  t.is(result.comment[0], 'Creator: WebTracer 2')
})

test('creator comment', t => {
  const result = makeResult()
  creator({ name: 'WebTracer', comment: 'Recorded 2015-04-07' }, result)
  t.is(result.comment[0], [
    'Creator: WebTracer',
    'Recorded 2015-04-07'
  ].join('\n'))
})
