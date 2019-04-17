import test from 'ava'
import isolate from 'helper/isolate'
const [ entry, { checks, request, variables } ] =
  isolate(test, 'render/entry/logic', {
    checks: 'render/checks',
    request: 'render/request',
    variables: 'render/variables'
  })

test.serial('minimal', t => {
  request.returns(`// Request`)
  const result = entry({
    index: 0,
    request: {},
    checks: new Map(),
    variables: new Map()
  })
  t.is(result, `// Request`)
})

test.serial('checks', t => {
  request.returns(`// Request`)
  checks.returns(`// Checks`)
  const result = entry({
    index: 0,
    request: {},
    checks: new Map().set('token exists', {}),
    variables: new Map()
  })
  t.is(result, '' +
`// Request
// Checks`)
})

test.serial('variables', t => {
  request.returns(`// Request`)
  variables.returns(`// Variables`)
  const result = entry({
    index: 0,
    request: {},
    checks: new Map(),
    variables: new Map().set('token', {})
  })
  t.is(result, '' +
`// Request
// Variables`)
})

test.serial('checks variables', t => {
  request.returns(`// Request`)
  checks.returns(`// Checks`)
  variables.returns(`// Variables`)
  const result = entry({
    index: 0,
    request: {},
    checks: new Map().set('token exists', {}),
    variables: new Map().set('token', {})
  })
  t.is(result, '' +
`// Request
// Checks
// Variables`)
})
