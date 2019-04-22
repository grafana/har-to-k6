import test from 'ava'
import isolate from 'helper/isolate'
import { checkState as makeCheckState } from 'make'
import { CheckCondition } from 'enum'
const [ JSONPathValue, { comparison, indent, string } ] =
  isolate(test, 'render/check/variant/JSONPathValue', {
    comparison: 'render/check/comparison',
    indent: 'render/indent',
    string: 'render/string'
  })

test.serial('comparison', t => {
  string.onSecondCall().returns('"LoggedIn"')
  const spec = {
    expression: '$.result',
    condition: CheckCondition.Equals,
    value: 'LoggedIn',
    state: makeCheckState()
  }
  spec.state.negated = false
  spec.state.plural = true
  JSONPathValue('$.result equals LoggedIn', spec)
  t.true(comparison.calledOnce)
  t.is(comparison.firstCall.args[0], CheckCondition.Equals)
  t.is(comparison.firstCall.args[1], '"LoggedIn"')
  t.is(string.secondCall.args[0], 'LoggedIn')
})

test.serial('positive', t => {
  string.onFirstCall().returns('expression')
  comparison.returns('comparison')
  indent.returns('indented')
  const spec = {
    expression: '$.result',
    condition: CheckCondition.Equals,
    value: 'LoggedIn',
    state: makeCheckState()
  }
  spec.state.negated = false
  spec.state.plural = true
  const result = JSONPathValue('$.result equals LoggedIn', spec)
  t.deepEqual(result, {
    name: '$.result equals LoggedIn',
    value: '' +
`response => {
indented
}`
  })
  t.is(indent.firstCall.args[0], '' +
`const values = jsonpath.query(response.json(), expression);
return !!values.find(value => valuecomparison);`)
})

test.serial('negative', t => {
  string.onFirstCall().returns('expression')
  comparison.returns('comparison')
  indent.returns('indented')
  const spec = {
    expression: '$.result',
    condition: CheckCondition.NotContains,
    value: 'Error',
    state: makeCheckState()
  }
  spec.state.negated = true
  spec.state.plural = true
  const result = JSONPathValue('$.result does not contain Error', spec)
  t.deepEqual(result, {
    name: '$.result does not contain Error',
    value: '' +
`response => {
indented
}`
  })
  t.is(indent.firstCall.args[0], '' +
`const values = jsonpath.query(response.json(), expression);
return !values.find(value => valuecomparison);`)
})
