import test from 'ava'
import isolate from 'helper/isolate'
const [ text, { string, template } ] =
  isolate(test, 'render/text', {
    string: 'render/string',
    template: 'render/template'
  })

test.serial('prime string', t => {
  const rendered = Symbol('rendered')
  string.returns(rendered)
  const result = text('Curiouser and curiouser')
  t.is(result, rendered)
  t.true(string.calledOnce)
  t.true(template.notCalled)
})

test.serial('prime template', t => {
  const rendered = Symbol('rendered')
  template.returns(rendered)
  /* eslint-disable-next-line no-template-curly-in-string */
  const result = text('Welcome to the end of the internet, ${name}')
  t.is(result, rendered)
  t.true(template.calledOnce)
  t.true(string.notCalled)
})

test.serial('composite string', t => {
  const rendered = Symbol('rendered')
  string.returns(rendered)
  const result = text([ 'one', 'two', 'three' ])
  t.is(result, rendered)
  t.true(string.calledOnce)
  t.true(template.notCalled)
})

test.serial('composite template', t => {
  const rendered = Symbol('rendered')
  template.returns(rendered)
  /* eslint-disable-next-line no-template-curly-in-string */
  const result = text([ '${one}', '${two}', '${three}' ])
  t.is(result, rendered)
  t.true(template.calledOnce)
  t.true(string.notCalled)
})

test.serial('composite string delimiter', t => {
  text([ 'one', 'two', 'three' ], ',')
  t.is(string.firstCall.args[1], ',')
})

test.serial('composite template delimiter', t => {
  /* eslint-disable-next-line no-template-curly-in-string */
  text([ '${one}', '${two}', '${three}' ], ',')
  t.is(template.firstCall.args[1], ',')
})
