import test from 'ava'
import isolate from 'helper/isolate'
import { extrinsic } from 'aid'
import { CheckCondition, CheckSubject, CheckType } from 'enum'
const [ computed, { JSONPath, JSONPathValue, Regex, Text } ] =
  isolate(test, 'string/check/name/computed', {
    JSONPath: 'string/check/name/JSONPath',
    JSONPathValue: 'string/check/name/JSONPathValue',
    Regex: 'string/check/name/Regex',
    Text: 'string/check/name/Text'
  })

test.serial('JSONPath', t => {
  const result = Symbol('result')
  JSONPath.returns(result)
  const name = computed({
    type: CheckType.JSONPath,
    expression: 'result.token'
  })
  t.is(name, result)
})

test.serial('JSONPathValue', t => {
  const result = Symbol('result')
  JSONPathValue.returns(result)
  const name = computed({
    type: CheckType.JSONPathValue,
    expression: 'user.id',
    condition: CheckCondition.Equals,
    value: '8734'
  })
  t.is(name, result)
})

test.serial('Regex', t => {
  const result = Symbol('result')
  Regex.returns(result)
  const name = computed({
    type: CheckType.Regex,
    subject: CheckSubject.HttpStatusCode,
    expression: '2\\d\\d'
  })
  t.is(name, result)
})

test.serial('Text', t => {
  const result = Symbol('result')
  Text.returns(result)
  const name = computed({
    type: CheckType.Text,
    subject: CheckSubject.ResponseBody,
    condition: CheckCondition.StartsWith,
    value: 'Success'
  })
  t.is(name, result)
})

test.serial('invalid', t => {
  t.throws(() => {
    computed({ type: extrinsic(CheckType) })
  }, { name: 'UnrecognizedCheckType' })
})
