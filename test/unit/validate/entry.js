import test from 'ava'
import isolate from 'helper/isolate'
import { assay as makeAssay } from 'make'
const [ entry, { checks, request, variables } ] =
  isolate(test, 'validate/entry', {
    checks: 'validate/checks',
    request: 'validate/request',
    variables: 'validate/variables'
  })

test.serial('invalid pageref', t => {
  t.throws(() => {
    entry({ pageref: 5 }, 0, makeAssay())
  }, { name: 'InvalidEntryPageref' })
})

test.serial('missing request', t => {
  t.throws(() => {
    entry({}, 0, makeAssay())
  }, { name: 'MissingEntryRequest' })
})

test.serial('invalid request', t => {
  t.throws(() => {
    entry({ request: 5 }, 0, makeAssay())
  }, { name: 'InvalidEntryRequest' })
})

test.serial('invalid checks', t => {
  t.throws(() => {
    entry({ request: {}, checks: 5 }, 0, makeAssay())
  }, { name: 'InvalidEntryChecks' })
})

test.serial('invalid variables', t => {
  t.throws(() => {
    entry({ request: {}, variables: 5 }, 0, makeAssay())
  }, { name: 'InvalidEntryVariables' })
})

test.serial('invalid comment', t => {
  t.throws(() => {
    entry({ request: {}, comment: 5 }, 0, makeAssay())
  }, { name: 'InvalidComment' })
})

test.serial('valid minimal', t => {
  entry({ request: {} }, 0, makeAssay())
  t.true(request.calledOnce)
  t.true(checks.notCalled)
  t.true(variables.notCalled)
})

test.serial('valid maximal', t => {
  entry({
    request: {},
    pageref: 'page1',
    checks: [],
    variables: [],
    comment: 'Apple a day'
  }, 0, makeAssay())
  t.true(request.calledOnce)
  t.true(checks.calledOnce)
  t.true(variables.calledOnce)
})
