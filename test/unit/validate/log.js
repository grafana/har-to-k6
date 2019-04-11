import test from 'ava'
import isolate from 'helper/isolate'
import { makeAssay } from 'aid'
const [ log, { browser, creator, entries, pages } ] =
  isolate(test, 'validate/log', {
    browser: 'validate/browser',
    creator: 'validate/creator',
    entries: 'validate/entries',
    pages: 'validate/pages'
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
  log({}, makeAssay())
  t.true(creator.notCalled)
  t.true(browser.notCalled)
  t.true(pages.notCalled)
  t.true(entries.notCalled)
})

test.serial('valid full', t => {
  log({
    version: '1.2',
    creator: {},
    browser: {},
    comment: 'High load',
    pages: [],
    entries: []
  }, makeAssay())
  t.true(creator.calledOnce)
  t.true(browser.calledOnce)
  t.true(pages.calledOnce)
  t.true(entries.calledOnce)
})
