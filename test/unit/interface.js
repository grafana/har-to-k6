import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
const parse = sinon.stub()
const render = sinon.stub()
let harToK6

test.before(t => {
  mockRequire('../../src/parse', parse)
  mockRequire('../../src/render', render)
  harToK6 = require('index')
})

test.afterEach.always(t => {
  parse.reset()
  render.reset()
})

test('liHARToK6Script', t => {
  const result = Symbol('result')
  render.returns(result)
  t.is(harToK6.liHARToK6Script(), result)
  t.true(parse.calledOnce)
  t.true(render.calledOnce)
})
