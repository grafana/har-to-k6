const test = require('ava')
const variable = require('parse/variable')
const { VariableType } = require('enum')

function makeSpec() {
  return new Map()
}

test('minimal', t => {
  const spec = makeSpec()
  variable(
    {
      name: 'token',
      type: VariableType.JSONPath,
      expression: 'token',
    },
    spec
  )
  t.deepEqual(
    spec,
    new Map().set('token', {
      type: VariableType.JSONPath,
      expression: 'token',
      attribute: null,
    })
  )
})

test('comment', t => {
  const spec = makeSpec()
  variable(
    {
      name: 'token',
      type: VariableType.JSONPath,
      expression: 'token',
      comment: 'Extract authorization token',
    },
    spec
  )
  t.deepEqual(
    spec,
    new Map().set('token', {
      type: VariableType.JSONPath,
      expression: 'token',
      comment: 'Extract authorization token',
      attribute: null,
    })
  )
})
