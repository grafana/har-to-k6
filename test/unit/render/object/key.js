import test from 'ava'
import isolate from 'helper/isolate'
import { StringSpecies } from 'enum'
const [ key, { string, stringSpecies, template } ] =
  isolate(test, 'render/object/key', {
    string: 'render/string',
    stringSpecies: 'species/string',
    template: 'render/template'
  })

test.serial('Identifier', t => {
  stringSpecies.returns(StringSpecies.Identifier)
  const result = key('token')
  t.is(result, 'token')
  t.true(string.notCalled)
  t.true(template.notCalled)
})

test.serial('String', t => {
  stringSpecies.returns(StringSpecies.String)
  string.returns('"Content-Type"')
  const result = key('Content-Type')
  t.is(result, '"Content-Type"')
  t.true(string.calledOnce)
  t.true(template.notCalled)
})

test.serial('Template', t => {
  /* eslint-disable no-template-curly-in-string */
  stringSpecies.returns(StringSpecies.Template)
  template.returns('`${name}`')
  const result = key('${name}')
  t.is(result, '[`${name}`]')
  t.true(string.notCalled)
  t.true(template.calledOnce)
  /* eslint-enable no-template-curly-in-string */
})
