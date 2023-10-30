const test = require('ava')
const browser = require('validate/browser')
const { assay: makeAssay } = require('make')

test('invalid name', t => {
  t.throws(
    () => {
      browser({ name: 5 }, makeAssay())
    },
    { name: 'InvalidBrowserName' }
  )
})

test('invalid version', t => {
  t.throws(
    () => {
      browser({ name: 'Brave', version: 5 }, makeAssay())
    },
    { name: 'InvalidBrowserVersion' }
  )
})

test('invalid comment', t => {
  t.throws(
    () => {
      browser({ name: 'Brave', version: '5', comment: 5 }, makeAssay())
    },
    { name: 'InvalidBrowserComment' }
  )
})

test('valid empty', t => {
  t.notThrows(() => {
    browser({}, makeAssay())
  })
})

test('valid full', t => {
  t.notThrows(() => {
    browser(
      { name: 'Brave', version: '5', comment: 'Build 20171028' },
      makeAssay()
    )
  })
})
