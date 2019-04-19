import test from 'ava'
import isolate from 'helper/isolate'
import { requestSpec as makeRequestSpec } from 'make'
const [ request, { address, query } ] =
  isolate(test, 'parse/state/request', {
    address: 'parse/state/address',
    query: 'parse/state/query'
  })

test.serial('basic', t => {
  request(makeRequestSpec())
  t.true(query.calledOnce)
  t.true(address.calledOnce)
})
