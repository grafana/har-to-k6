import test from 'ava'
import fixed from 'render/post/url/plural/fixed'

test('1', t => {
  const params = new Map()
    .set('search', new Set([ { value: 'kitten' } ]))
  const result = fixed(params)
  t.is(result, 'search=kitten')
})

test('3', t => {
  const params = new Map()
    .set('search', new Set([ { value: 'kitten' } ]))
    .set('filter', new Set([ { value: 'cute' } ]))
    .set('order', new Set([ { value: 'cuteness' } ]))
  const result = fixed(params)
  t.is(result, 'filter=cute&order=cuteness&search=kitten')
})

test('multivalue', t => {
  const params = new Map()
    .set('search', new Set([
      { value: 'kitten' },
      { value: 'puppy' },
      { value: 'quokka' }
    ]))
  const result = fixed(params)
  t.is(
    result,
    'search%5B0%5D=kitten&search%5B1%5D=puppy&search%5B2%5D=quokka'
  )
})
