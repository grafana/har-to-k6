import test from 'ava'
import param from 'validate/param'
import { assay as makeAssay } from 'make'

test('missing name', t => {
  t.throws(() => {
    param({}, 0, 0, makeAssay())
  }, { name: 'MissingParamName' })
})

test('invalid name', t => {
  t.throws(() => {
    param({ name: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidParamName' })
})

test('invalid value', t => {
  t.throws(() => {
    param({ name: 'recordId', value: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidParamValue' })
})

test('invalid file name', t => {
  t.throws(() => {
    param({ name: 'recordId', fileName: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidParamFileName' })
})

test('invalid type', t => {
  t.throws(() => {
    param({ name: 'recordId', contentType: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidParamType' })
})

test('invalid comment', t => {
  t.throws(() => {
    param({ name: 'recordId', comment: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidComment' })
})

test('valid minimal', t => {
  t.notThrows(() => {
    param({ name: 'recordId' }, 0, 0, makeAssay())
  })
})

test('valid full', t => {
  t.notThrows(() => {
    param({
      name: 'data',
      value: 'first,second,third\none,two,three',
      fileName: 'data.csv',
      contentType: 'text/csv',
      comment: 'Test sending CSV data'
    }, 0, 0, makeAssay())
  })
})
