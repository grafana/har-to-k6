import test from 'ava'
import variable from 'validate/variable'
import { VariableType } from 'enum'
import { extrinsic } from 'aid'
import { assay as makeAssay } from 'make'

test('missing name', t => {
  t.throws(() => {
    variable({}, 0, 0, makeAssay())
  }, { name: 'MissingVariableName' })
})

test('invalid name type', t => {
  t.throws(() => {
    variable({ name: 5 }, 0, 0, makeAssay())
  }, {
    name: 'InvalidVariableName',
    message: 'Invalid variable name (0:0): must be string'
  })
})

test('invalid name character', t => {
  t.throws(() => {
    variable({ name: 'badname{badbadname}' }, 8, 2, makeAssay())
  }, {
    name: 'InvalidVariableName',
    message: "Invalid variable name (8:2): may not contain '}'"
  })
})

test('missing type', t => {
  t.throws(() => {
    variable({ name: 'a' }, 0, 0, makeAssay())
  }, { name: 'MissingVariableType' })
})

test('invalid type type', t => {
  t.throws(() => {
    variable({ name: 'a', type: 3.1415 }, 0, 0, makeAssay())
  }, {
    name: 'InvalidVariableType',
    message: 'Invalid variable type (0:0): must be nonnegative integer'
  })
})

test('invalid type undefined', t => {
  const type = extrinsic(VariableType)
  t.throws(() => {
    variable({ name: 'a', type }, 0, 0, makeAssay())
  }, {
    name: 'InvalidVariableType',
    message: `Invalid variable type (0:0): ${type}`
  })
})

test('missing expression', t => {
  t.throws(() => {
    variable({ name: 'a', type: VariableType.JSONPath }, 0, 0, makeAssay())
  }, { name: 'MissingVariableExpression' })
})

test('invalid expression', t => {
  t.throws(() => {
    variable({
      name: 'a',
      type: VariableType.JSONPath,
      expression: 5
    }, 0, 0, makeAssay())
  }, { name: 'InvalidVariableExpression' })
})

test('invalid comment', t => {
  t.throws(() => {
    variable({
      name: 'a',
      type: VariableType.JSONPath,
      expression: 'user.token',
      comment: 5
    }, 0, 0, makeAssay())
  })
})

test('valid JSONPath', t => {
  t.notThrows(() => {
    variable({
      name: 'a',
      type: VariableType.JSONPath,
      expression: 'user.token',
      comment: 'Extract session token'
    }, 0, 0, makeAssay())
  })
})

test('valid Regex', t => {
  t.notThrows(() => {
    variable({
      name: 'a',
      type: VariableType.Regex,
      expression: 'token=([^\n]+)\n',
      comment: 'Extract session token'
    }, 0, 0, makeAssay())
  })
})
