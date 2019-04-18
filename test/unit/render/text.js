import test from 'ava'
import isolate from 'helper/isolate'
const [ text, { string, template } ] =
  isolate(test, 'render/text', {
    string: 'render/string',
    template: 'render/template'
  })

test.serial('string', t => {
  const rendered = Symbol('rendered')
  string.returns(rendered)
  const result = text('Curioser and curioser')
  t.is(result, rendered)
  t.true(string.calledOnce)
  t.true(template.notCalled)
})

test.serial('template', t => {
  const rendered = Symbol('rendered')
  template.returns(rendered)
  /* eslint-disable-next-line no-template-curly-in-string */
  const result = text('Welcome to the end of the internet, ${name}')
  t.is(result, rendered)
  t.true(template.calledOnce)
  t.true(string.notCalled)
})
