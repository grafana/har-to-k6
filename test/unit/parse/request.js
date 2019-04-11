import test from 'ava'
import isolate from 'helper/isolate'
const [ request, { cookies, headers, postData, queryString } ] =
  isolate(test, 'parse/request', {
    cookies: 'parse/cookies',
    headers: 'parse/headers',
    postData: 'parse/postData',
    queryString: 'parse/queryString'
  })

function makeSpec () {
  return {}
}

test.serial('basic', t => {
  const spec = makeSpec()
  request({ method: 'get', url: 'http://example.com' }, spec)
  t.deepEqual(spec, {
    method: 'GET',
    address: 'http://example.com',
    query: new Map(),
    headers: new Map(),
    cookies: new Map(),
    post: new Map()
  })
  t.true(queryString.notCalled)
  t.true(headers.notCalled)
  t.true(cookies.notCalled)
  t.true(postData.notCalled)
})

test.serial('comment', t => {
  const spec = makeSpec()
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
  }, makeSpec())
  t.true(queryString.calledOnce)
})

test.serial('headers', t => {
  request({
    method: 'GET',
    url: 'http://example.com',
    headers: []
  }, makeSpec())
  t.true(headers.calledOnce)
})

test.serial('cookies', t => {
  request({
    method: 'GET',
    url: 'http://example.com',
    cookies: []
  }, makeSpec())
  t.true(cookies.calledOnce)
})

test.serial('postData', t => {
  request({
    method: 'GET',
    url: 'http://example.com',
    postData: {}
  }, makeSpec())
  t.true(postData.calledOnce)
})
