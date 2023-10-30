const test = require('ava')
const mockRequire = require('mock-require')
const sinon = require('sinon')
const { CheckType } = require('enum')
const checkName = sinon.stub()
let check

const checkVariant = {}
for (const name of Object.keys(CheckType)) {
  checkVariant[name] = sinon.stub()
}

function makeSpec() {
  return new Map()
}

test.before(() => {
  mockRequire('../../../src/string/check/name', checkName)
  mockRequire('../../../src/parse/checkVariant', checkVariant)
  check = require('parse/check')
})

test.afterEach.always(() => {
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
    new Map().set('token exists', {
      type: CheckType.JSONPath,
      state: { negated: false, plural: false },
    })
  )
})

test.serial('comment', t => {
  checkName.returns('token exists')
  const spec = makeSpec()
  check(
    {
      type: CheckType.JSONPath,
      expression: 'token',
      comment: 'Verify token returned',
    },
    spec
  )
  t.deepEqual(
    spec,
    new Map().set('token exists', {
      type: CheckType.JSONPath,
      comment: 'Verify token returned',
      state: { negated: false, plural: false },
    })
  )
})
