import test from 'ava'
import isolate from 'helper/isolate'
const [ harToK6, { parse, render, validate } ] =
  isolate(test, 'index', {
    parse: 'parse',
    render: 'render',
    validate: 'validate'
  })

test.serial('liHARToK6Script', t => {
  const result = Symbol('result')
  render.returns(result)
  t.is(harToK6.liHARToK6Script(), result)
  t.true(validate.calledOnce)
  t.true(parse.calledOnce)
  t.true(render.calledOnce)
})
