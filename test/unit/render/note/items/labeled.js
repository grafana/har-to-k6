import test from 'ava'
import labeled from 'render/note/items/labeled'

test('empty', t => {
  const result = labeled([])
  t.is(result, null)
})

test('1 line', t => {
  const result = labeled([ { value: 'speed', comment: 'Enable superspeed' } ])
  t.is(result, 'speed: Enable superspeed')
})

test('3 line', t => {
  const result = labeled([
    { value: 'vision', comment: 'Enable X-ray vision' },
    { value: 'speed', comment: 'Enable superspeed' },
    { value: 'strength', comment: 'Enable superstrength' }
  ])
  t.is(result, '' +
`speed: Enable superspeed
strength: Enable superstrength
vision: Enable X-ray vision`)
})

test('1 multiline', t => {
  const result = labeled([
    {
      value: 'wisdom',
      comment: 'Enable responsibility\nNecessary with great power'
    }
  ])
  t.is(result, '' +
`wisdom:
Enable responsibility
Necessary with great power`)
})

test('2 multiline', t => {
  const result = labeled([
    {
      value: 'wisdom',
      comment: 'Enable responsibility\nNecessary with great power'
    },
    {
      value: 'resilience',
      comment: 'Enable fortitude\nNecessary with great trials'
    }
  ])
  t.is(result, '' +
`resilience:
Enable fortitude
Necessary with great trials
wisdom:
Enable responsibility
Necessary with great power`)
})

test('mixed', t => {
  const result = labeled([
    {
      value: 'wisdom',
      comment: 'Enable responsibility\nNecessary with great power'
    },
    {
      value: 'resilience',
      comment: 'Enable fortitude\nNecessary with great trials'
    },
    { value: 'vision', comment: 'Enable X-ray vision' },
    { value: 'strength', comment: 'Enable superstrength' },
    { value: 'speed', comment: 'Enable superspeed' }
  ])
  t.is(result, '' +
`speed: Enable superspeed
strength: Enable superstrength
vision: Enable X-ray vision
resilience:
Enable fortitude
Necessary with great trials
wisdom:
Enable responsibility
Necessary with great power`)
})
