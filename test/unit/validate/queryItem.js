import test from 'ava'
import queryItem from 'validate/queryItem'
import { assay as makeAssay } from 'make'

test('missing name', t => {
  t.throws(() => {
    queryItem({}, 0, 0, makeAssay())
  }, { name: 'MissingQueryItemName' })
})

test('invalid name', t => {
  t.throws(() => {
    queryItem({ name: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidQueryItemName' })
})

test('invalid value', t => {
  t.throws(() => {
    queryItem({ name: 'search', value: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidQueryItemValue' })
})

test('invalid comment', t => {
  t.throws(() => {
    queryItem({ name: 'search', comment: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidComment' })
})

test('valid minimal', t => {
  t.notThrows(() => {
    queryItem({ name: 'search' }, 0, 0, makeAssay())
  })
})

test('valid empty value', t => {
  t.notThrows(() => {
    queryItem({ name: 'search', value: '' }, 0, 0, makeAssay())
  })
})

test('valid full', t => {
  t.notThrows(() => {
    queryItem({
      name: 'search',
      value: 'kitten',
      comment: 'Typical search'
    }, 0, 0, makeAssay())
  })
})
