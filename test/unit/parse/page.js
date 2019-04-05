import test from 'ava'
import page from 'parse/page'
import { makeResult } from 'aid'

test('missing id', t => {
  const result = makeResult()
  t.throws(() => {
    page({}, 0, result)
  }, { name: 'MissingPageId' })
})

test('duplicate id', t => {
  const result = makeResult()
  result.pages.set('page1', {})
  t.throws(() => {
    page({ id: 'page1' }, 0, result)
  }, { name: 'DuplicatePageId' })
})

test('missing title', t => {
  const result = makeResult()
  t.throws(() => {
    page({ id: 'page1' }, 0, result)
  }, { name: 'MissingPageTitle' })
})

test('missing index', t => {
  const result = makeResult()
  t.throws(() => {
    page({ id: 'page1', title: 'Page 1' }, 0, result)
  }, { name: 'MissingPageIndex' })
})

test('success', t => {
  const result = makeResult()
  page({ id: 'page1', title: 'Page 1', index: 1 }, 0, result)
  t.deepEqual(result.pages, new Map([ [ 'page1', {
    name: 'Page 1',
    index: 1,
    entries: []
  } ] ]))
})

test('comment', t => {
  const result = makeResult()
  page(
    { id: 'page1', title: 'Page 1', index: 1, comment: 'Heavy load' },
    0,
    result
  )
  t.deepEqual(result.pages, new Map([ [ 'page1', {
    name: 'Page 1',
    index: 1,
    comment: 'Heavy load',
    entries: []
  } ] ]))
})
