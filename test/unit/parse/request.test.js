const test = require('ava')
const isolate = require('helper/isolate')
const { requestSpec: makeRequestSpec } = require('make')
const [request, { cookies, headers, postData, queryString, state }] = isolate(
  test,
  'parse/request',
  {
    cookies: 'parse/cookies',
    headers: 'parse/headers',
    postData: 'parse/postData',
    queryString: 'parse/queryString',
    state: 'parse/state/request',
  }
)

test.serial('basic', t => {
  const spec = makeRequestSpec()
  request({ method: 'get', url: 'http://example.com' }, spec)
  t.is(spec.method, 'GET')
  t.is(spec.address, 'http://example.com')
  t.deepEqual(spec.query, new Map())
  t.deepEqual(spec.headers, new Map())
  t.deepEqual(spec.cookies, new Map())
  t.deepEqual(spec.post, {})
  t.true(queryString.notCalled)
  t.true(headers.notCalled)
  t.true(cookies.notCalled)
  t.true(postData.notCalled)
  t.true(state.calledOnce)
})

test.serial('comment', t => {
  const spec = makeRequestSpec()
  request(
    {
      method: 'GET',
      url: 'http://example.com',
      comment: 'Load test home page',
    },
    spec
  )
  t.is(spec.comment, 'Load test home page')
})

test.serial('queryString', t => {
  request(
    {
      method: 'GET',
      url: 'http://example.com',
      queryString: [],
    },
    makeRequestSpec()
  )
  t.true(queryString.calledOnce)
})

test.serial('headers', t => {
  request(
    {
      method: 'GET',
      url: 'http://example.com',
      headers: [],
    },
    makeRequestSpec()
  )
  t.true(headers.calledOnce)
})

test.serial('headers boundary', t => {
  const spec = makeRequestSpec()
  spec.state.post.boundary = 'foobar'
  spec.headers = new Map().set(
    'content-type',
    new Set([{ value: 'multipart/form-data' }])
  )
  request(
    {
      method: 'POST',
      url: 'http://example.com',
      headers: [{ name: 'content-type', value: 'multipart/form-data' }],
    },
    spec
  )
  t.is(
    [...spec.headers.get('content-type')][0].value,
    'multipart/form-data; boundary=foobar'
  )
})

test.serial('it should ignore postData when method is GET', t => {
  request(
    {
      method: 'GET',
      url: 'http://example.com',
      postData: { mimeType: 'text/plain' },
    },
    makeRequestSpec()
  )
  t.false(postData.calledOnce)
})

test.serial('it should add postData when method is POST', t => {
  request(
    {
      method: 'POST',
      url: 'http://example.com',
      postData: { mimeType: 'text/plain' },
    },
    makeRequestSpec()
  )
  t.true(postData.calledOnce)
})

test.serial('postData empty', t => {
  request(
    {
      method: 'GET',
      url: 'http://example.com',
      postData: {},
    },
    makeRequestSpec()
  )
  t.true(postData.notCalled)
})
