const test = require('ava')
const isolate = require('helper/isolate')
const [harToK6, { parse, render, validate }] = isolate(test, 'index', {
  parse: 'parse',
  render: 'render',
  validate: 'validate',
})

test.serial('liHARToK6Script', async t => {
  render.returns('result')
  const result = await harToK6.liHARToK6Script()
  t.deepEqual(result, { main: 'result' })
  t.true(validate.calledOnce)
  t.true(parse.calledOnce)
  t.true(render.calledOnce)
})
