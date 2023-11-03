const test = require('ava')
const isolate = require('helper/isolate')
const { result: makeResult } = require('make')
const [log, { browser, creator, entries, pages, options }] = isolate(
  test,
  'parse/log',
  {
    browser: 'parse/browser',
    creator: 'parse/creator',
    entries: 'parse/entries',
    pages: 'parse/pages',
    options: 'parse/options',
  }
)

test.serial('comment', t => {
  const result = makeResult()
  log({ comment: 'Sent from my iPad' }, result)
  t.is(result.comment[0], 'Sent from my iPad')
})

test.serial('creator', t => {
  log({ creator: {} }, makeResult())
  t.true(creator.calledOnce)
})

test.serial('options', t => {
  log({ options: {} }, makeResult())
  t.true(options.calledOnce)
})

test.serial('browser', t => {
  log({ browser: {} }, makeResult())
  t.true(browser.calledOnce)
})

test.serial('pages', t => {
  log({ pages: [] }, makeResult())
  t.true(pages.calledOnce)
})

test.serial('entries', t => {
  log({ entries: [] }, makeResult())
  t.true(entries.calledOnce)
})
