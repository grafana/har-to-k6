import test from 'ava'
import isolate from 'helper/isolate'
import { requestSpec as makeRequestSpec } from 'make'
const [ request, { cookies, headers, postData, queryString } ] =
  isolate(test, 'parse/request', {
    cookies: 'parse/cookies',
    headers: 'parse/headers',
    postData: 'parse/postData',
    queryString: 'parse/queryString'
  })

test.serial('basic', t => {
  const spec = makeRequestSpec()
  request({ method: 'get', url: 'http://example.com' }, spec)
  t.deepEqual(spec, {
    method: 'GET',
    address: 'http://example.com',
    query: new Map(),
    headers: new Map(),
    cookies: new Map(),
    post: {}
  })
  t.true(queryString.notCalled)
  t.true(headers.notCalled)
  t.true(cookies.notCalled)
  t.true(postData.notCalled)
})

test.serial('comment', t => {
  const spec = makeRequestSpec()
  request({
    method: 'GET',
    url: 'http://example.com',
    comment: 'Load test home page'
  }, spec)
  t.is(spec.comment, 'Load test home page')
})

test.serial('queryString', t => {
  request({
    method: 'GET',
    url: 'http://example.com',
    queryString: []
  }, makeRequestSpec())
  t.true(queryString.calledOnce)
})

test.serial('headers', t => {
  request({
    method: 'GET',
    url: 'http://example.com',
    headers: []
  }, makeRequestSpec())
  t.true(headers.calledOnce)
})

test.serial('cookies', t => {
  request({
    method: 'GET',
    url: 'http://example.com',
    cookies: []
  }, makeRequestSpec())
  t.true(cookies.calledOnce)
})

test.serial('postData', t => {
  request({
    method: 'GET',
    url: 'http://example.com',
    postData: {}
  }, makeRequestSpec())
  t.true(postData.calledOnce)
})
