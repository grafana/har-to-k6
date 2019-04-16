import test from 'ava'
import isolate from 'helper/isolate'
import { StringSpecies } from 'enum'
const [ string, { identifier, template } ] =
  isolate(test, 'species/string', {
    identifier: 'species/string/identifier',
    template: 'species/string/template'
  })

test.serial('Template', t => {
  template.returns(true)
  /* eslint-disable-next-line no-template-curly-in-string */
  t.is(string('Authorization: Bearer ${token}'), StringSpecies.Template)
})

test.serial('Identifier', t => {
  template.returns(false)
  identifier.returns(true)
  t.is(string('token'), StringSpecies.Identifier)
})

test.serial('String', t => {
  template.returns(false)
  identifier.returns(false)
  t.is(string('Content-Type'), StringSpecies.String)
})
