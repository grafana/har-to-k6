import test from 'ava'
import page from 'validate/page'
import { makeAssay } from 'aid'

test('missing id', t => {
  t.throws(() => {
    page({}, 0, makeAssay())
  }, { name: 'MissingPageId' })
})

test('invalid id', t => {
  t.throws(() => {
    page({ id: 5 }, 0, makeAssay())
  }, { name: 'InvalidPageId' })
})

test('duplicate id', t => {
  const assay = makeAssay()
  page({ id: 'page1', title: 'Page 1', index: 0 }, 0, assay)
  t.throws(() => {
    page({ id: 'page1' }, 1, assay)
  }, { name: 'DuplicatePageId' })
})

test('missing title', t => {
  t.throws(() => {
    page({ id: 'page1' }, 0, makeAssay())
  }, { name: 'MissingPageTitle' })
})

test('invalid title', t => {
  t.throws(() => {
    page({ id: 'page1', title: 5 }, 0, makeAssay())
  }, { name: 'InvalidPageTitle' })
})

test('missing index', t => {
  t.throws(() => {
    page({ id: 'page1', title: 'Page 1' }, 0, makeAssay())
  }, { name: 'MissingPageIndex' })
})

test('invalid index', t => {
  t.throws(() => {
    page({ id: 'page1', title: 'Page 1', index: 'two' }, 0, makeAssay())
  }, { name: 'InvalidPageIndex' })
})

test('duplicate index', t => {
  const assay = makeAssay()
  page({ id: 'page1', title: 'Page 1', index: 0 }, 0, assay)
  t.throws(() => {
    page({ id: 'page2', title: 'Page 2', index: 0 }, 1, assay)
  }, { name: 'DuplicatePageIndex' })
})

test('invalid comment', t => {
  t.throws(() => {
    const assay = makeAssay()
    page({ id: 'page1', title: 'Page 1', index: 0, comment: 5 }, 0, assay)
  }, { name: 'InvalidComment' })
})

test('success', t => {
  t.notThrows(() => {
    page({ id: 'page1', title: 'Page 1', index: 0 }, 0, makeAssay())
  })
})
