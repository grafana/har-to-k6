import test from 'ava'
import isolate from 'helper/isolate'
const [ entry, { checks, comment, request, variables } ] =
  isolate(test, 'render/entry', {
    checks: 'render/checks',
    comment: 'render/comment',
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

test.serial('comment entry', t => {
  request.returns(`// Request`)
  comment.returns(`// Perform log in`)
  const result = entry({
    index: 0,
    request: {},
    checks: new Map(),
    variables: new Map(),
    comment: 'Perform log in'
  })
  t.is(result, '' +
`// Perform log in
// Request`)
})

test.serial('comment request', t => {
  request.returns(`// Request`)
  comment.returns(`// Perform log in`)
  const result = entry({
    index: 0,
    request: { comment: 'Perform log in' },
    checks: new Map(),
    variables: new Map()
  })
  t.is(result, '' +
`// Perform log in
// Request`)
})

test.serial('comment both', t => {
  request.returns(`// Request`)
  comment.returns('' +
`/*
 * Perform log in
 * Authenticate with test credentials
 */`)
  const result = entry({
    index: 0,
    request: { comment: 'Authenticate with test credentials' },
    checks: new Map(),
    variables: new Map(),
    comment: 'Perform log in'
  })
  t.is(result, '' +
`/*
 * Perform log in
 * Authenticate with test credentials
 */
// Request`)
})

test.serial('full', t => {
  request.returns(`// Request`)
  checks.returns(`// Checks`)
  variables.returns(`// Variables`)
  comment.returns('' +
`/*
 * Perform log in
 * Authenticate with test credentials
 */`)
  const result = entry({
    index: 0,
    request: { comment: 'Authenticate with test credentials' },
    checks: new Map().set('token exists', {}),
    variables: new Map().set('token', {}),
    comment: 'Perform log in'
  })
  t.is(result, '' +
`/*
 * Perform log in
 * Authenticate with test credentials
 */
// Request
// Checks
// Variables`)
})
