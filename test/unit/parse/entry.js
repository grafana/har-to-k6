import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import { makeResult } from 'aid'
import { ExternalScope } from 'sym'
const checks = sinon.stub()
const request = sinon.stub()
const variables = sinon.stub()
let entry

test.before(t => {
  mockRequire('../../../src/parse/checks', checks)
  mockRequire('../../../src/parse/request', request)
  mockRequire('../../../src/parse/variables', variables)
  entry = require('parse/entry')
})

test.afterEach.always(t => {
  checks.reset()
  request.reset()
  variables.reset()
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
    variables: {}
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
