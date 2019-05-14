import test from 'ava'
import isolate from 'helper/isolate'
const [ variables, { variable } ] =
  isolate(test, 'render/variables', { variable: 'render/variable' })

test.serial('empty', t => {
  const result = variables(new Map())
  t.is(result, null)
})

test.serial('1', t => {
  variable.returns('variable')
  const spec = new Map().set('token', {})
  const result = variables(spec)
  t.true(variable.calledOnce)
  t.is(result, 'variable')
})

test.serial('3', t => {
  variable.returns('variable')
  const spec = new Map()
    .set('token', {})
    .set('identifier', {})
    .set('username', {})
  const result = variables(spec)
  t.true(variable.calledThrice)
  t.is(result, '' +
`variable
variable
variable`)
})
