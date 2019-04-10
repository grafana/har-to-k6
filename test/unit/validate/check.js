import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import { CheckCondition, CheckSubject, CheckType } from 'enum'
import { extrinsic, makeAssay } from 'aid'
let check

const checkVariant = {}
for (const name of Object.keys(CheckType)) {
  checkVariant[name] = sinon.stub()
}

test.before(t => {
  mockRequire('../../../src/validate/checkVariant', checkVariant)
  check = require('validate/check')
})

test.afterEach.always(t => {
  for (const name of Object.keys(checkVariant)) {
    checkVariant[name].reset()
  }
})

test.serial('missing type', t => {
  t.throws(() => {
    check({}, 0, 0, makeAssay())
  }, { name: 'MissingCheckType' })
})

test.serial('invalid type', t => {
  t.throws(() => {
    check({ type: extrinsic(CheckType) }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckType' })
})

test.serial('invalid subject', t => {
  t.throws(() => {
    check({
      type: CheckType.Text,
      subject: extrinsic(CheckSubject)
    }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckSubject' })
})

test.serial('invalid condition', t => {
  t.throws(() => {
    check({
      type: CheckType.Text,
      condition: extrinsic(CheckCondition)
    }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckCondition' })
})

test.serial('invalid expression', t => {
  t.throws(() => {
    check({ type: CheckType.Text, expression: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckExpression' })
})

test.serial('invalid flags', t => {
  t.throws(() => {
    check({ type: CheckType.Text, flags: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckFlags' })
})

test.serial('invalid value', t => {
  t.throws(() => {
    check({ type: CheckType.Text, value: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckValue' })
})

test.serial('invalid comment', t => {
  t.throws(() => {
    check({ type: CheckType.Text, comment: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidComment' })
})

test.serial('valid minimal', t => {
  check({ type: CheckType.Regex }, 0, 0, makeAssay())
  t.true(checkVariant.Regex.calledOnce)
})

test.serial('valid full', t => {
  check({
    type: CheckType.JSONPathValue,
    subject: CheckSubject.HttpStatusCode,
    condition: CheckCondition.Equals,
    expression: 'user.id',
    flags: 'i',
    value: '7484',
    comment: 'How deep does the rabbit hole go?'
  }, 0, 0, makeAssay())
  t.true(checkVariant.JSONPathValue.calledOnce)
})
