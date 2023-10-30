const test = require('ava')
const page = require('validate/page')
const { assay: makeAssay } = require('make')

test('missing id', t => {
  t.throws(
    () => {
      page({}, 0, makeAssay())
    },
    { name: 'MissingPageId' }
  )
})

test('invalid id', t => {
  t.throws(
    () => {
      page({ id: 5 }, 0, makeAssay())
    },
    { name: 'InvalidPageId' }
  )
})

test('duplicate id', t => {
  const assay = makeAssay()
  page({ id: 'page1', title: 'Page 1' }, 0, assay)
  t.throws(
    () => {
      page({ id: 'page1' }, 1, assay)
    },
    { name: 'DuplicatePageId' }
  )
})

test('invalid title', t => {
  t.throws(
    () => {
      page({ id: 'page1', title: 5 }, 0, makeAssay())
    },
    { name: 'InvalidPageTitle' }
  )
})

test('invalid sleep', t => {
  t.throws(
    () => {
      page({ id: 'page1', title: 'Page 1', sleep: {} }, 0, makeAssay())
    },
    { name: 'InvalidPageSleep' }
  )
})

test('invalid comment', t => {
  t.throws(
    () => {
      const assay = makeAssay()
      page({ id: 'page1', title: 'Page 1', comment: 5 }, 0, assay)
    },
    { name: 'InvalidPageComment' }
  )
})

test('valid', t => {
  t.notThrows(() => {
    page({ id: 'page1', title: 'Page 1' }, 0, makeAssay())
  })
})
