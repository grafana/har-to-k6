import test from 'ava'
import isolate from 'helper/isolate'
const [ header, { comment } ] =
  isolate(test, 'render/entry/header', { comment: 'render/comment' })

test.serial('entry', t => {
  comment.returns(`// Perform log in`)
  const result = header({
    index: 0,
    request: {},
    checks: new Map(),
    variables: new Map(),
    comment: 'Perform log in'
  })
  t.is(result, `// Perform log in`)
})

test.serial('request', t => {
  comment.returns(`// Perform log in`)
  const result = header({
    index: 0,
    request: { comment: 'Perform log in' },
    checks: new Map(),
    variables: new Map()
  })
  t.is(result, `// Perform log in`)
})

test.serial('entry request', t => {
  comment.returns('' +
`/*
 * Perform log in
 * Authenticate with test credentials
 */`)
  const result = header({
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
 */`)
})
