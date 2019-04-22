import test from 'ava'
import isolate from 'helper/isolate'
import { requestSpec as makeRequestSpec } from 'make'
import { PostSpecies } from 'enum'
const [ request, {
  address,
  cookies,
  headers,
  indent,
  object,
  post,
  postMultipartResolvedPre,
  text
} ] = isolate(test, 'render/request', {
  address: 'render/address',
  cookies: 'render/cookies',
  headers: 'render/headers',
  indent: 'render/indent',
  object: 'render/object',
  post: 'render/post',
  postMultipartResolvedPre: 'render/post/multipart/resolved/pre',
  text: 'render/text'
})

test.serial('minimal', t => {
  text.withArgs('GET').returns('"GET"')
  address.callsFake((spec, factor) => {
    factor.address = '"http://example.com"'
  })
  post.returns(null)
  headers.returns(null)
  cookies.returns(null)
  const spec = makeRequestSpec()
  spec.method = 'GET'
  spec.address = 'http://example.com'
  spec.state.post.species = PostSpecies.Empty
  spec.state.params.variable = false
  const result = request(spec)
  t.is(result, `response = http.request("GET", "http://example.com");`)
  t.true(address.calledOnce)
  t.true(post.calledOnce)
  t.true(postMultipartResolvedPre.notCalled)
  t.true(headers.calledOnce)
  t.true(cookies.calledOnce)
})

test.serial('body', t => {
  text.withArgs('POST').returns('"POST"')
  address.callsFake((spec, factor) => {
    factor.address = '"http://example.com"'
  })
  post.returns('"search=kitten"')
  indent.returns('  args')
  headers.returns(null)
  cookies.returns(null)
  const spec = makeRequestSpec()
  spec.method = 'POST'
  spec.address = 'http://example.com'
  spec.post.text = 'search=kitten'
  spec.state.post.species = PostSpecies.Unstructured
  spec.state.params.variable = false
  const result = request(spec)
  t.is(result, '' +
`response = http.request(
  args
);`)
  t.deepEqual(post.firstCall.args[0], spec)
  t.is(indent.firstCall.args[0], '' +
`"POST",
"http://example.com",
"search=kitten"`)
})

test.serial('headers', t => {
  text.withArgs('GET').returns('"GET"')
  address.callsFake((spec, factor) => {
    factor.address = '"http://example.com"'
  })
  headers.returns('' +
`{
  Accept: "*/*" // Accept everything
}`)
  object.returns('options')
  post.returns(null)
  cookies.returns(null)
  const spec = makeRequestSpec()
  spec.method = 'GET'
  spec.address = 'http://example.com'
  spec.headers.set('Accept', new Set([ { value: '*/*' } ]))
  spec.state.post.species = PostSpecies.Empty
  spec.state.params.variable = false
  const result = request(spec)
  t.is(result, '' +
`response = http.request("GET", "http://example.com", null, options);`)
  t.deepEqual(headers.firstCall.args[0], spec.headers)
  t.deepEqual(object.firstCall.args[0], [
    {
      name: 'headers',
      value: '' +
`{
  Accept: "*/*" // Accept everything
}`
    }
  ])
})

test.serial('cookies', t => {
  text.withArgs('GET').returns('"GET"')
  address.callsFake((spec, factor) => {
    factor.address = '"http://example.com"'
  })
  cookies.returns('' +
`{
  theme: "aqua" // Exercise prerelease theme
}`)
  object.returns('options')
  post.returns(null)
  headers.returns(null)
  const spec = makeRequestSpec()
  spec.method = 'GET'
  spec.address = 'http://example.com'
  spec.cookies.set('theme', new Set([ { value: 'aqua' } ]))
  spec.state.post.species = PostSpecies.Empty
  spec.state.params.variable = false
  const result = request(spec)
  t.is(result, '' +
`response = http.request("GET", "http://example.com", null, options);`)
  t.deepEqual(cookies.firstCall.args[0], spec.cookies)
  t.deepEqual(object.firstCall.args[0], [
    {
      name: 'cookies',
      value: '' +
`{
  theme: "aqua" // Exercise prerelease theme
}`
    }
  ])
})
