import test from 'ava'
import isolate from 'helper/isolate'
const [ singular, { object } ] =
  isolate(test, 'render/post/url/singular', { object: 'render/object' })

test.serial('basic', t => {
  const rendered = Symbol('rendered')
  object.returns(rendered)
  const spec = new Map()
    .set('search', new Set([ {} ]))
  const result = singular(spec)
  t.is(result, rendered)
  t.true(object.calledOnce)
  t.deepEqual(object.firstCall.args[0], [ { name: 'search' } ])
})

test.serial('multiple', t => {
  const spec = new Map()
    .set('search', new Set([ {} ]))
    .set('filter', new Set([ {} ]))
    .set('order', new Set([ {} ]))
  singular(spec)
  t.deepEqual(object.firstCall.args[0], [
    { name: 'search' },
    { name: 'filter' },
    { name: 'order' }
  ])
})

test.serial('value', t => {
  const spec = new Map()
    .set('search', new Set([ { value: 'kitten' } ]))
  singular(spec)
  t.deepEqual(object.firstCall.args[0], [
    { name: 'search', value: '"kitten"' }
  ])
})

test.serial('comment', t => {
  const spec = new Map()
    .set('session', new Set([ { comment: 'Start fresh session' } ]))
  singular(spec)
  t.deepEqual(object.firstCall.args[0], [
    { name: 'session', comment: 'Start fresh session' }
  ])
})

test.serial('content type', t => {
  const spec = new Map()
    .set('data', new Set([ { contentType: 'text/csv' } ]))
  singular(spec)
  t.deepEqual(object.firstCall.args[0], [
    { name: 'data', comment: 'Content type: text/csv' }
  ])
})

test.serial('file name', t => {
  const spec = new Map()
    .set('data', new Set([ { fileName: 'data.csv' } ]))
  singular(spec)
  t.deepEqual(object.firstCall.args[0], [
    { name: 'data', comment: 'File name: data.csv' }
  ])
})

test.serial('full comment', t => {
  const spec = new Map()
    .set('data', new Set([ {
      comment: 'Import data',
      contentType: 'text/csv',
      fileName: 'data.csv'
    } ]))
  singular(spec)
  t.deepEqual(object.firstCall.args[0], [ {
    name: 'data',
    comment: '' +
`Import data
Content type: text/csv
File name: data.csv`
  } ])
})
