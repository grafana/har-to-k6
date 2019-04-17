import test from 'ava'
import JSONPath from 'validate/checkVariant/JSONPath'
import { CheckCondition, CheckSubject, CheckType } from 'enum'
import { assay as makeAssay } from 'make'

test('missing expression', t => {
  t.throws(() => {
    JSONPath({ type: CheckType.JSONPath }, 0, 0, makeAssay())
  }, { name: 'MissingCheckExpression' })
})

test('invalid expression', t => {
  t.throws(() => {
    JSONPath({
      type: CheckType.JSONPath,
      expression: '$$$'
    }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckExpression' })
})

test('invalid condition', t => {
  t.throws(() => {
    JSONPath({
      type: CheckType.JSONPath,
      expression: 'user.id',
      condition: CheckCondition.StartsWith
    }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckCondition' })
})

test('invalid value', t => {
  t.throws(() => {
    JSONPath({
      type: CheckType.JSONPath,
      expression: 'user.id',
      value: '578'
    }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckValue' })
})

test('invalid value empty', t => {
  t.throws(() => {
    JSONPath({
      type: CheckType.JSONPath,
      expression: 'user.id',
      value: ''
    }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckValue' })
})

test('invalid flags', t => {
  t.throws(() => {
    JSONPath({
      type: CheckType.JSONPath,
      expression: 'user.id',
      flags: 'i'
    }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckFlags' })
})

test('invalid subject', t => {
  t.throws(() => {
    JSONPath({
      type: CheckType.JSONPath,
      subject: CheckSubject.ResponseHeaders,
      expression: 'user.id'
    }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckSubject' })
})

test('valid', t => {
  t.notThrows(() => {
    JSONPath({
      type: CheckType.JSONPath,
      expression: 'user.id'
    }, 0, 0, makeAssay())
  })
})

test('valid subject', t => {
  t.notThrows(() => {
    JSONPath({
      type: CheckType.JSONPath,
      subject: CheckSubject.ResponseBody,
      expression: 'user.id'
    }, 0, 0, makeAssay())
  })
})
