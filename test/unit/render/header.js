import test from 'ava'
import isolate from 'helper/isolate'
const [ header, { note, text } ] =
  isolate(test, 'render/header', {
    note: 'render/note',
    text: 'render/text'
  })

test.serial('single value', t => {
  note.returns(null)
  text.returns('"text/plain"')
  const result = header('Content-Type', new Set([ { value: 'text/plain' } ]))
  t.deepEqual(result, {
    name: 'Content-Type',
    value: '"text/plain"',
    comment: null
  })
})

test.serial('multiple values', t => {
  note.returns(null)
  text.returns('"text/plain,text/csv,text/html"')
  const result = header('Accept', new Set([
    { value: 'text/plain' },
    { value: 'text/csv' },
    { value: 'text/html' }
  ]))
  t.deepEqual(result, {
    name: 'Accept',
    value: '"text/plain,text/csv,text/html"',
    comment: null
  })
})

test.serial('comment', t => {
  note.returns('comment')
  text.returns('"text/plain"')
  const result = header('Content-Type', new Set([ { value: 'text/plain' } ]))
  t.deepEqual(result, {
    name: 'Content-Type',
    value: '"text/plain"',
    comment: 'comment'
  })
})
