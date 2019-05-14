import test from 'ava'
import variable from 'parse/variable'
import { VariableType } from 'enum'

function makeSpec () {
  return new Map()
}

test('minimal', t => {
  const spec = makeSpec()
  variable({
    name: 'token',
    type: VariableType.JSONPath,
    expression: 'token'
  }, spec)
  t.deepEqual(
    spec,
    new Map()
      .set('token', { type: VariableType.JSONPath, expression: 'token' })
  )
})

test('comment', t => {
  const spec = makeSpec()
  variable({
    name: 'token',
    type: VariableType.JSONPath,
    expression: 'token',
    comment: 'Extract authorization token'
  }, spec)
  t.deepEqual(
    spec,
    new Map()
      .set('token', {
        type: VariableType.JSONPath,
        expression: 'token',
        comment: 'Extract authorization token'
      })
  )
})
