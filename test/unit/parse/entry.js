import test from 'ava'
import isolate from 'helper/isolate'
import { makeResult } from 'aid'
import { ExternalScope } from 'sym'
const [ entry, { checks, request, variables } ] =
  isolate(test, 'parse/entry', {
    checks: 'parse/checks',
    request: 'parse/request',
    variables: 'parse/variables'
  })

test.serial('basic', t => {
  const result = makeResult()
  entry({ index: 0, request: {} }, result)
  t.true(result.scopes.has(ExternalScope))
  t.is(result.scopes.get(ExternalScope).size, 1)
  t.deepEqual(result.scopes, new Map([ [ ExternalScope, new Set([ {
    index: 0,
    request: {},
    checks: {},
    variables: new Map()
  } ]) ] ]))
  t.true(request.calledOnce)
  t.true(checks.notCalled)
  t.true(variables.notCalled)
})

test.serial('comment', t => {
  const result = makeResult()
  entry({ index: 0, request: {}, comment: 'Test home page' }, result)
  const spec = [ ...result.scopes.get(ExternalScope) ][0]
  t.is(spec.comment, 'Test home page')
})

test.serial('checks', t => {
  entry({ index: 0, request: {}, checks: [] }, makeResult())
  t.true(checks.calledOnce)
})

test.serial('variables', t => {
  entry({ index: 0, request: {}, variables: [] }, makeResult())
  t.true(variables.calledOnce)
})
