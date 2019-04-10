import test from 'ava'
import entryIndex from 'validate/entryIndex'

test('invalid external', t => {
  t.throws(() => {
    entryIndex([ { index: 7 }, { index: 7 } ])
  }, { name: 'DuplicateEntryIndex' })
})

test('invalid page', t => {
  t.throws(() => {
    entryIndex([
      { pageref: 'page8', index: 3 },
      { pageref: 'page8', index: 3 }
    ])
  }, { name: 'DuplicateEntryIndex' })
})

test('valid empty', t => {
  t.notThrows(() => {
    entryIndex([])
  })
})

test('valid external', t => {
  t.notThrows(() => {
    entryIndex([ { index: 1 }, { index: 2 }, { index: 3 } ])
  })
})

test('valid page', t => {
  t.notThrows(() => {
    entryIndex([
      { pageref: 'page1', index: 1 },
      { pageref: 'page1', index: 2 },
      { pageref: 'page1', index: 3 }
    ])
  })
})

test('valid pages', t => {
  t.notThrows(() => {
    entryIndex([
      { pageref: 'page1', index: 5 },
      { pageref: 'page2', index: 5 },
      { pageref: 'page1', index: 8 },
      { pageref: 'page2', index: 8 },
      { pageref: 'page1', index: 12 },
      { pageref: 'page2', index: 12 }
    ])
  })
})

test('valid mixed', t => {
  t.notThrows(() => {
    entryIndex([
      { index: 5 },
      { index: 8 },
      { index: 12 },
      { pageref: 'page1', index: 5 },
      { pageref: 'page2', index: 5 },
      { pageref: 'page1', index: 8 },
      { pageref: 'page2', index: 8 },
      { pageref: 'page1', index: 12 },
      { pageref: 'page2', index: 12 }
    ])
  })
})
