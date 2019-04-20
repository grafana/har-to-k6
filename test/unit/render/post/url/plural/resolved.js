import test from 'ava'
import isolate from 'helper/isolate'
const [ resolved, { note, object, text } ] =
  isolate(test, 'render/post/url/plural/resolved', {
    note: 'render/note',
    object: 'render/object',
    text: 'render/text'
  })

test.serial('result', t => {
  object.returns('{}')
  const result = resolved(new Map())
  t.is(result, `formUrlEncode({})`)
})

test.serial('singular', t => {
  text.returns('"kitten"')
  const params = new Map()
    .set('search', new Set([ { value: 'kitten' } ]))
  resolved(params)
  t.deepEqual(object.firstCall.args[0], [
    { name: 'search', value: '"kitten"' }
  ])
})

test.serial('plural', t => {
  text.onFirstCall().returns('"kitten"')
  text.onSecondCall().returns('"puppy"')
  text.onThirdCall().returns('"quokka"')
  const params = new Map()
    .set('search', new Set([
      { value: 'kitten' },
      { value: 'puppy' },
      { value: 'quokka' }
    ]))
  resolved(params)
  t.deepEqual(object.firstCall.args[0], [
    { name: 'search', value: '[ "kitten", "puppy", "quokka" ]' }
  ])
})

test.serial('comment singular', t => {
  text.returns('"kitten"')
  note.returns('Find kittens')
  const params = new Map()
    .set('search', new Set([ { value: 'kitten', comment: 'Find kittens' } ]))
  resolved(params)
  t.deepEqual(object.firstCall.args[0], [
    { name: 'search', value: '"kitten"', comment: 'Find kittens' }
  ])
})

test.serial('comment plural', t => {
  text.onFirstCall().returns('"kitten"')
  text.onSecondCall().returns('"puppy"')
  text.onThirdCall().returns('"quokka"')
  note.returns('' +
`kitten: Find kittens
puppy: Find puppies
quokka:
Also find quokkas
They are the best`)
  const params = new Map()
    .set('search', new Set([
      { value: 'kitten', comment: 'Find kittens' },
      { value: 'puppy', comment: 'Find puppies' },
      { value: 'quokka', comment: 'Also find quokkas\nThey are the best' }
    ]))
  resolved(params)
  t.deepEqual(note.firstCall.args[0], [ ...params.get('search') ])
  t.deepEqual(object.firstCall.args[0], [
    {
      name: 'search',
      value: '[ "kitten", "puppy", "quokka" ]',
      comment: '' +
`kitten: Find kittens
puppy: Find puppies
quokka:
Also find quokkas
They are the best`
    }
  ])
})
