/* eslint-disable no-template-curly-in-string */

import test from 'ava'
import isolate from 'helper/isolate'
import { StringSpecies } from 'enum'
const [ order, { stringSpecies } ] =
  isolate(test, 'render/object/order', { stringSpecies: 'species/string' })

test.serial('empty', t => {
  const items = []
  order(items)
  t.deepEqual(items, [])
})

test.serial('1', t => {
  const items = [ { key: 'a' } ]
  order(items)
  t.deepEqual(items, [ { key: 'a' } ])
})

test.serial('species', t => {
  stringSpecies.withArgs('Content-Type').returns(StringSpecies.String)
  stringSpecies.withArgs('${name}').returns(StringSpecies.Template)
  stringSpecies.withArgs('token').returns(StringSpecies.Identifier)
  const items = [
    { key: 'Content-Type' },
    { key: '${name}' },
    { key: 'token' }
  ]
  order(items)
  t.deepEqual(items, [
    { key: 'token' },
    { key: 'Content-Type' },
    { key: '${name}' }
  ])
})

test.serial('Identifier', t => {
  stringSpecies.returns(StringSpecies.Identifier)
  const items = [
    { key: 'orange' },
    { key: 'apple' },
    { key: 'cranberry' }
  ]
  order(items)
  t.deepEqual(items, [
    { key: 'apple' },
    { key: 'cranberry' },
    { key: 'orange' }
  ])
})

test.serial('String', t => {
  stringSpecies.returns(StringSpecies.String)
  const items = [
    { key: 'Content-Type' },
    { key: 'Accept-Encoding' },
    { key: 'Content-Encoding' }
  ]
  order(items)
  t.deepEqual(items, [
    { key: 'Accept-Encoding' },
    { key: 'Content-Encoding' },
    { key: 'Content-Type' }
  ])
})

test.serial('Template', t => {
  stringSpecies.returns(StringSpecies.Template)
  const items = [
    { key: '${QueryField}' },
    { key: '${ConstraintDimension}' },
    { key: '${JoinTable}' }
  ]
  order(items)
  t.deepEqual(items, [
    { key: '${ConstraintDimension}' },
    { key: '${JoinTable}' },
    { key: '${QueryField}' }
  ])
})

test.serial('mixed', t => {
  stringSpecies.withArgs('apple').returns(StringSpecies.Identifier)
  stringSpecies.withArgs('cranberry').returns(StringSpecies.Identifier)
  stringSpecies.withArgs('orange').returns(StringSpecies.Identifier)
  stringSpecies.withArgs('Accept-Encoding').returns(StringSpecies.String)
  stringSpecies.withArgs('Content-Encoding').returns(StringSpecies.String)
  stringSpecies.withArgs('Content-Type').returns(StringSpecies.String)
  stringSpecies.withArgs('${ConstraintDimension}')
    .returns(StringSpecies.Template)
  stringSpecies.withArgs('${JoinTable}').returns(StringSpecies.Template)
  stringSpecies.withArgs('${QueryField}').returns(StringSpecies.Template)
  const items = [
    { key: 'Accept-Encoding' },
    { key: 'orange' },
    { key: '${QueryField}' },
    { key: 'cranberry' },
    { key: '${ConstraintDimension}' },
    { key: 'Content-Type' },
    { key: 'Content-Encoding' },
    { key: 'apple' },
    { key: '${JoinTable}' }
  ]
  order(items)
  t.deepEqual(items, [
    { key: 'apple' },
    { key: 'cranberry' },
    { key: 'orange' },
    { key: 'Accept-Encoding' },
    { key: 'Content-Encoding' },
    { key: 'Content-Type' },
    { key: '${ConstraintDimension}' },
    { key: '${JoinTable}' },
    { key: '${QueryField}' }
  ])
})
