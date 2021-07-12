import test from 'ava'
import page from 'parse/page'
import { result as makeResult } from 'make'

test('main', (t) => {
  const result = makeResult()
  page({ id: 'page1', title: 'Page 1' }, result)
  t.deepEqual(
    result.pages,
    new Map([
      [
        'page1',
        {
          name: 'page1 - Page 1',
        },
      ],
    ])
  )
})

test('favor name before title', (t) => {
  const result = makeResult()
  page({ id: 'page_id', name: 'Page name', title: 'Page title' }, result)
  t.deepEqual(
    result.pages,
    new Map([
      [
        'page_id',
        {
          name: 'Page name - Page title',
        },
      ],
    ])
  )
})

test('fallback to using id as name', (t) => {
  const result = makeResult()
  page({ id: 'page_id_1', title: 'Page title' }, result)

  const result2 = makeResult()
  page({ id: 'page_id_2', name: '', title: 'Page title' }, result2)

  t.deepEqual(
    result.pages,
    new Map([
      [
        'page_id_1',
        {
          name: 'page_id_1 - Page title',
        },
      ],
    ])
  )

  t.deepEqual(
    result2.pages,
    new Map([
      [
        'page_id_2',
        {
          name: 'page_id_2 - Page title',
        },
      ],
    ])
  )
})

test('comment', (t) => {
  const result = makeResult()
  page({ id: 'page1', title: 'Page 1', comment: 'Heavy load' }, result)
  t.deepEqual(
    result.pages,
    new Map([
      [
        'page1',
        {
          name: 'page1 - Page 1',
          comment: 'Heavy load',
        },
      ],
    ])
  )
})
