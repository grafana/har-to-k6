import test from 'ava'
import param from 'validate/param'
import { assay as makeAssay } from 'make'

test('should ignore errors when name is empty', t => {
  t.notThrows(() => {
    param({
      name: null,
    })
  })
})

test('should throw when name is invalid', t => {
  t.throws(
    () => {
      param({ name: 5 }, 0, 0, makeAssay())
    },
    { name: 'InvalidParamName' }
  )
})

test('should throw when value is invalid', t => {
  t.throws(
    () => {
      param({ name: 'recordId', value: 5 }, 0, 0, makeAssay())
    },
    { name: 'InvalidParamValue' }
  )
})

test('should throw when file name is invalid', t => {
  t.throws(
    () => {
      param({ name: 'recordId', fileName: 5 }, 0, 0, makeAssay())
    },
    { name: 'InvalidParamFileName' }
  )
})

test('should throw when type is invalid', t => {
  t.throws(
    () => {
      param({ name: 'recordId', contentType: 5 }, 0, 0, makeAssay())
    },
    { name: 'InvalidParamType' }
  )
})

test('should throw when comment is invalid', t => {
  t.throws(
    () => {
      param({ name: 'recordId', comment: 5 }, 0, 0, makeAssay())
    },
    { name: 'InvalidParamComment' }
  )
})

test('should not throw when name is valid', t => {
  t.notThrows(() => {
    param({ name: 'recordId' }, 0, 0, makeAssay())
  })
})

test('should not throw when all values are valid', t => {
  t.notThrows(() => {
    param(
      {
        name: 'data',
        value: 'first,second,third\none,two,three',
        fileName: 'data.csv',
        contentType: 'text/csv',
        comment: 'Test sending CSV data',
      },
      0,
      0,
      makeAssay()
    )
  })
})
