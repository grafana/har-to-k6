const test = require('ava')
const isolate = require('helper/isolate')
const [fixed, { comment, note, string }] = isolate(
  test,
  'render/post/url/plural/fixed',
  {
    comment: 'render/comment',
    note: 'render/note/map',
    string: 'render/string',
  }
)

test.serial('result', t => {
  string.returns('rendered')
  const params = new Map()
  const result = fixed(params)
  t.true(string.calledOnce)
  t.is(result, 'rendered')
})

test.serial('1', t => {
  const params = new Map().set('search', new Set([{ value: 'kitten' }]))
  fixed(params)
  t.is(string.firstCall.args[0], 'search=kitten')
})

test.serial('3', t => {
  const params = new Map()
    .set('search', new Set([{ value: 'kitten' }]))
    .set('filter', new Set([{ value: 'cute' }]))
    .set('order', new Set([{ value: 'cuteness' }]))
  fixed(params)
  t.is(string.firstCall.args[0], 'search=kitten&filter=cute&order=cuteness')
})

test.serial('multivalue', t => {
  const params = new Map().set(
    'search',
    new Set([{ value: 'kitten' }, { value: 'puppy' }, { value: 'quokka' }])
  )
  fixed(params)
  t.is(string.firstCall.args[0], 'search=kitten%2Cpuppy%2Cquokka')
})

test.serial('comment', t => {
  note.returns('-search- Find kittens')
  comment.returns('// -search- Find kittens')
  string.returns('"search=kitten"')
  const params = new Map().set(
    'search',
    new Set([{ value: 'kitten', comment: 'Find kittens' }])
  )
  const result = fixed(params)
  t.deepEqual(note.firstCall.args[0], params)
  t.is(comment.firstCall.args[0], '-search- Find kittens')
  t.is(
    result,
    '' +
      `// -search- Find kittens
"search=kitten"`
  )
})
