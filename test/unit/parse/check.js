import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import { CheckType } from 'enum'
const checkName = sinon.stub()
let check

const checkVariant = {}
for (const name of Object.keys(CheckType)) {
  checkVariant[name] = sinon.stub()
}

function makeSpec () {
  return new Map()
}

test.before(t => {
  mockRequire('../../../src/string/check/name', checkName)
  mockRequire('../../../src/parse/checkVariant', checkVariant)
  check = require('parse/check')
})

test.afterEach.always(t => {
  checkName.reset()
  for (const name of Object.keys(checkVariant)) {
    checkVariant[name].reset()
  }
})

test.serial('basic', t => {
  checkName.returns('token exists')
  const spec = makeSpec()
  check({ type: CheckType.JSONPath, expression: 'token' }, spec)
  t.deepEqual(
    spec,
    new Map()
      .set('token exists', { type: CheckType.JSONPath })
  )
})

test.serial('comment', t => {
  checkName.returns('token exists')
  const spec = makeSpec()
  check({
    type: CheckType.JSONPath,
    expression: 'token',
    comment: 'Verify token returned'
  }, spec)
  t.deepEqual(
    spec,
    new Map()
      .set('token exists', {
        type: CheckType.JSONPath,
        comment: 'Verify token returned'
      })
  )
})
