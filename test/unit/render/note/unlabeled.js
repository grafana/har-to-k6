import test from 'ava'
import unlabeled from 'render/note/unlabeled'

test('empty', t => {
  const result = unlabeled([])
  t.is(result, null)
})

test('1 line', t => {
  const result = unlabeled([ { comment: 'Enable superspeed' } ])
  t.is(result, 'Enable superspeed')
})

test('3 line', t => {
  const result = unlabeled([
    { comment: 'Enable superspeed' },
    { comment: 'Enable superstrength' },
    { comment: 'Enable X-ray vision' }
  ])
  t.is(result, '' +
`Enable superspeed
Enable superstrength
Enable X-ray vision`)
})

test('1 multiline', t => {
  const result = unlabeled([
    { comment: 'Enable responsibility\nNecessary with great power' }
  ])
  t.is(result, '' +
`Enable responsibility
Necessary with great power`)
})

test('2 multiline', t => {
  const result = unlabeled([
    { comment: 'Enable responsibility\nNecessary with great power' },
    { comment: 'Enable fortitude\nNecessary with great trials' }
  ])
  t.is(result, '' +
`Enable responsibility
Necessary with great power
Enable fortitude
Necessary with great trials`)
})

test('mixed', t => {
  const result = unlabeled([
    { comment: 'Enable responsibility\nNecessary with great power' },
    { comment: 'Enable superspeed' },
    { comment: 'Enable fortitude\nNecessary with great trials' },
    { comment: 'Enable superstrength' }
  ])
  t.is(result, '' +
`Enable superspeed
Enable superstrength
Enable responsibility
Necessary with great power
Enable fortitude
Necessary with great trials`)
})
