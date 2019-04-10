import test from 'ava'
import JSONPathValue from 'validate/checkVariant/JSONPathValue'
import { CheckCondition, CheckSubject, CheckType } from 'enum'
import { makeAssay } from 'aid'

test('missing expression', t => {
  t.throws(() => {
    JSONPathValue({ type: CheckType.JSONPathValue }, 0, 0, makeAssay())
  }, { name: 'MissingCheckExpression' })
})

test('missing condition', t => {
  t.throws(() => {
    JSONPathValue({
      type: CheckType.JSONPathValue,
      expression: 'user.id'
    }, 0, 0, makeAssay())
  }, { name: 'MissingCheckCondition' })
})

test('missing value', t => {
  t.throws(() => {
    JSONPathValue({
      type: CheckType.JSONPathValue,
      expression: 'user.id',
      condition: CheckCondition.Equals
    }, 0, 0, makeAssay())
  }, { name: 'MissingCheckValue' })
})

test('invalid subject', t => {
  t.throws(() => {
    JSONPathValue({
      type: CheckType.JSONPathValue,
      expression: 'user.id',
      condition: CheckCondition.Equals,
      value: '578',
      subject: CheckSubject.HttpStatusCode
    }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckSubject' })
})

test('valid', t => {
  t.notThrows(() => {
    JSONPathValue({
      type: CheckType.JSONPathValue,
      expression: 'user.id',
      condition: CheckCondition.Equals,
      value: '578'
    }, 0, 0, makeAssay())
  })
})

test('valid subject', t => {
  t.notThrows(() => {
    JSONPathValue({
      type: CheckType.JSONPathValue,
      subject: CheckSubject.ResponseBody,
      expression: 'user.id',
      condition: CheckCondition.Equals,
      value: '578'
    }, 0, 0, makeAssay())
  })
})
