import test from 'ava'
import isolate from 'helper/isolate'
import { checkState as makeCheckState } from 'make'
const [ JSONPath, { indent, string } ] =
  isolate(test, 'render/check/variant/JSONPath', {
    indent: 'render/indent',
    string: 'render/string'
  })

test.serial('basic', t => {
  string.returns('expression')
  indent.returns('indented')
  const spec = {
    expression: '$.token',
    state: makeCheckState()
  }
  spec.state.negated = false
  spec.state.plural = false
  const result = JSONPath('$.token exists', spec)
  t.deepEqual(result, {
    name: '$.token exists',
    value: '' +
`response => {
indented
}`
  })
  t.is(string.firstCall.args[0], '$.token')
  t.is(
    indent.firstCall.args[0],
    `return !!jsonpath.query(response.json(), expression).length;`
  )
})
