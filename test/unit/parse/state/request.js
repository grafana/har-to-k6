import test from 'ava'
import isolate from 'helper/isolate'
import { requestSpec as makeRequestSpec } from 'make'
const [ request, { address, params, post, query } ] =
  isolate(test, 'parse/state/request', {
    address: 'parse/state/address',
    params: 'parse/state/params',
    post: 'parse/state/post',
    query: 'parse/state/query'
  })

test.serial('basic', t => {
  request(makeRequestSpec())
  t.true(query.calledOnce)
  t.true(address.calledOnce)
  t.true(post.calledOnce)
  t.true(params.calledOnce)
})
