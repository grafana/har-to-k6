import test from 'ava'
import isolate from 'helper/isolate'
const [ fixed, { comment, note, string } ] =
  isolate(test, 'render/post/url/plural/fixed', {
    comment: 'render/comment',
    note: 'render/note/map',
    string: 'render/string'
  })

test.serial('result', t => {
  string.returns('rendered')
  const params = new Map()
  const result = fixed(params)
  t.true(string.calledOnce)
  t.is(result, 'rendered')
})

test.serial('1', t => {
  const params = new Map()
    .set('search', new Set([ { value: 'kitten' } ]))
  fixed(params)
  t.is(string.firstCall.args[0], 'search=kitten')
})

test.serial('3', t => {
  const params = new Map()
    .set('search', new Set([ { value: 'kitten' } ]))
    .set('filter', new Set([ { value: 'cute' } ]))
    .set('order', new Set([ { value: 'cuteness' } ]))
  fixed(params)
  t.is(string.firstCall.args[0], 'filter=cute&order=cuteness&search=kitten')
})

test.serial('multivalue', t => {
  const params = new Map()
    .set('search', new Set([
      { value: 'kitten' },
      { value: 'puppy' },
      { value: 'quokka' }
    ]))
  fixed(params)
  t.is(
    string.firstCall.args[0],
    'search%5B0%5D=kitten&search%5B1%5D=puppy&search%5B2%5D=quokka'
  )
})

test.serial('comment', t => {
  note.returns('-search- Find kittens')
  comment.returns('// -search- Find kittens')
  string.returns('"search=kitten"')
  const params = new Map()
    .set('search', new Set([
      { value: 'kitten', comment: 'Find kittens' }
    ]))
  const result = fixed(params)
  t.deepEqual(note.firstCall.args[0], params)
  t.is(result, '' +
`// -search- Find kittens
"search=kitten"`)
})
