import test from 'ava'
import isolate from 'helper/isolate'
const [ harToK6, { compat, parse, render, validate } ] =
  isolate(test, 'index', {
    compat: 'build/compat',
    parse: 'parse',
    render: 'render',
    validate: 'validate'
  })

test.serial('liHARToK6Script', async t => {
  render.returns('result')
  compat.returns('compat')
  const result = await harToK6.liHARToK6Script()
  t.deepEqual(result, { main: 'result', compat: 'compat' })
  t.true(validate.calledOnce)
  t.true(parse.calledOnce)
  t.true(render.calledOnce)
  t.true(compat.calledOnce)
})
