import test from 'ava'
import isolate from 'helper/isolate'
const [ note, { itemsNote } ] =
  isolate(test, 'render/note/map', { itemsNote: 'render/note/items' })

test.serial('empty', t => {
  const result = note(new Map())
  t.is(result, null)
})

test.serial('no comment', t => {
  itemsNote.returns(null)
  const spec = new Map()
    .set('search', new Set([ {} ]))
  const result = note(spec)
  t.is(result, null)
})

test.serial('compact', t => {
  itemsNote.callsFake(items => [ ...items ][0].comment)
  const spec = new Map()
    .set('search', new Set([
      { value: 'kitten', comment: 'Find kittens' }
    ]))
    .set('filter', new Set([
      { value: 'cute', comment: 'Only find cute kittens' }
    ]))
    .set('order', new Set([
      { value: 'cuteness', comment: 'Show me the cutest kittens first' }
    ]))
  const result = note(spec)
  t.is(result, '' +
`-filter- Only find cute kittens
-order- Show me the cutest kittens first
-search- Find kittens`)
})

test.serial('spread', t => {
  itemsNote.onFirstCall().returns('' +
`kitten: Find kittens
puppy: Find puppies
quokka:
Also find quokkas
They are the best`)
  itemsNote.onSecondCall().returns('Only find cute animals')
  itemsNote.onThirdCall().returns('Show me the cutest animals first')
  const spec = new Map()
    .set('search', new Set([
      { value: 'kitten', comment: 'Find kittens' },
      { value: 'puppy', comment: 'Find puppies' },
      {
        value: 'quokka',
        comment: 'Also find quokkas\nThey are the best'
      }
    ]))
    .set('filter', new Set([
      { value: 'cute', comment: 'Only find cute animals' }
    ]))
    .set('order', new Set([
      { value: 'cuteness', comment: 'Show me the cutest animals first' }
    ]))
  const result = note(spec)
  t.is(result, '' +
`-filter- Only find cute animals

-order- Show me the cutest animals first

-search-
kitten: Find kittens
puppy: Find puppies
quokka:
Also find quokkas
They are the best`)
})
