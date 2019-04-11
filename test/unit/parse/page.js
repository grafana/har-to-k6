import test from 'ava'
import page from 'parse/page'
import { makeResult } from 'aid'

test('main', t => {
  const result = makeResult()
  page({ id: 'page1', title: 'Page 1', index: 1 }, result)
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
    result
  )
  t.deepEqual(result.pages, new Map([ [ 'page1', {
    name: 'Page 1',
    index: 1,
    comment: 'Heavy load',
    entries: []
  } ] ]))
})
