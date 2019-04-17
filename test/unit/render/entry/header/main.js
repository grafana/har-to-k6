import test from 'ava'
import main from 'render/entry/header/main'

test('empty', t => {
  const result = main({
    index: 0,
    request: {},
    checks: new Map(),
    variables: new Map()
  })
  t.is(result, null)
})

test('entry', t => {
  const result = main({
    index: 0,
    request: {},
    checks: new Map(),
    variables: new Map(),
    comment: 'Perform log in'
  })
  t.is(result, 'Perform log in')
})

test('request', t => {
  const result = main({
    index: 0,
    request: { comment: 'Perform log in' },
    checks: new Map(),
    variables: new Map()
  })
  t.is(result, 'Perform log in')
})

test('entry request', t => {
  const result = main({
    index: 0,
    request: { comment: 'Authenticate with test credentials' },
    checks: new Map(),
    variables: new Map(),
    comment: 'Perform log in'
  })
  t.is(result, '' +
`Perform log in
Authenticate with test credentials`)
})
