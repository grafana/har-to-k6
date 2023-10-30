const test = require('ava')
const header = require('validate/header')
const { assay: makeAssay } = require('make')

test('missing name', t => {
  t.throws(
    () => {
      header({}, 0, 0, makeAssay())
    },
    { name: 'MissingHeaderName' }
  )
})

test('invalid name', t => {
  t.throws(
    () => {
      header({ name: 5 }, 0, 0, makeAssay())
    },
    { name: 'InvalidHeaderName' }
  )
})

test('invalid value', t => {
  t.throws(
    () => {
      header({ name: 'Accept', value: 5 }, 0, 0, makeAssay())
    },
    { name: 'InvalidHeaderValue' }
  )
})

test('invalid comment', t => {
  t.throws(
    () => {
      header({ name: 'Accept', comment: 5 }, 0, 0, makeAssay())
    },
    { name: 'InvalidHeaderComment' }
  )
})

test('valid minimal', t => {
  t.notThrows(() => {
    header({ name: 'Accept' }, 0, 0, makeAssay())
  })
})

test('valid empty value', t => {
  t.notThrows(() => {
    header({ name: 'Accept', value: '' }, 0, 0, makeAssay())
  })
})

test('valid full', t => {
  t.notThrows(() => {
    header(
      {
        name: 'Accept',
        value: '*/*',
        comment: 'Accept everything',
      },
      0,
      0,
      makeAssay()
    )
  })
})
