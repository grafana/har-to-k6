const test = require('ava')
const condition = require('string/check/condition')
const { extrinsic } = require('aid')
const { CheckCondition } = require('enum')

test('Contains', t => {
  t.is(condition(CheckCondition.Contains), 'contains')
})

test('NotContains', t => {
  t.is(condition(CheckCondition.NotContains), 'does not contain')
})

test('Equals', t => {
  t.is(condition(CheckCondition.Equals), 'equals')
})

test('StartsWith', t => {
  t.is(condition(CheckCondition.StartsWith), 'starts with')
})

test('EndsWith', t => {
  t.is(condition(CheckCondition.EndsWith), 'ends with')
})

test('invalid', t => {
  t.throws(
    () => {
      condition(extrinsic(CheckCondition))
    },
    { name: 'UnrecognizedCheckCondition' }
  )
})
