import test from 'ava'
import { InvalidArchiveError } from '../../src/error'

const fn = () => {
  throw new InvalidArchiveError(
    { name: 'CoolError', path: 'test.main', indexes: [] },
    'This is my cool error'
  )
}

test('instanceof InvalidArchiveError', t => {
  const error = t.throws(
    () => {
      fn()
    },
    { instanceOf: InvalidArchiveError }
  )

  t.is(error.message, 'This is my cool error')
  t.is(true, true)
})
