import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import { makeAssay } from 'aid'
const browser = sinon.stub()
const creator = sinon.stub()
const entries = sinon.stub()
const pages = sinon.stub()
let log

test.before(t => {
  mockRequire('../../../src/validate/browser', browser)
  mockRequire('../../../src/validate/creator', creator)
  mockRequire('../../../src/validate/entries', entries)
  mockRequire('../../../src/validate/pages', pages)
  log = require('validate/log')
})

test.afterEach.always(t => {
  browser.reset()
  creator.reset()
  entries.reset()
  pages.reset()
})

test.serial('invalid version', t => {
  t.throws(() => {
    log({ version: 5 }, makeAssay())
  }, { name: 'InvalidVersion' })
})

test.serial('invalid creator', t => {
  t.throws(() => {
    log({ creator: 5 }, makeAssay())
  }, { name: 'InvalidCreator' })
})

test.serial('invalid browser', t => {
  t.throws(() => {
    log({ browser: 5 }, makeAssay())
  }, { name: 'InvalidBrowser' })
})

test.serial('invalid comment', t => {
  t.throws(() => {
    log({ comment: 5 }, makeAssay())
  }, { name: 'InvalidComment' })
})

test.serial('invalid pages', t => {
  t.throws(() => {
    log({ pages: {} }, makeAssay())
  }, { name: 'InvalidPages' })
})

test.serial('invalid entries', t => {
  t.throws(() => {
    log({ entries: {} }, makeAssay())
  }, { name: 'InvalidEntries' })
})

test.serial('valid empty', t => {
  t.notThrows(() => {
    log({}, makeAssay())
  })
})

test.serial('valid full', t => {
  t.notThrows(() => {
    log({
      version: '1.2',
      creator: {},
      browser: {},
      comment: 'High load',
      pages: [],
      entries: []
    }, makeAssay())
  })
})
