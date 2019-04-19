import test from 'ava'
import isolate from 'helper/isolate'
const [ note, { labeled, unlabeled } ] =
  isolate(test, 'render/note', {
    labeled: 'render/note/labeled',
    unlabeled: 'render/note/unlabeled'
  })

test.serial('empty', t => {
  const result = note([])
  t.is(result, null)
})

test.serial('1', t => {
  const result = note([ { value: 'speed', comment: 'Enable superspeed' } ])
  t.is(result, 'Enable superspeed')
})

test.serial('unlabeled', t => {
  unlabeled.returns('unlabeled')
  labeled.returns(null)
  const result = note([
    { comment: 'Enable superspeed' },
    { comment: 'Enable superstrength' },
    { comment: 'Enable X-ray vision' }
  ])
  t.is(result, 'unlabeled')
})

test.serial('labeled', t => {
  labeled.returns('labeled')
  unlabeled.returns(null)
  const result = note([
    { value: 'speed', comment: 'Enable superspeed' },
    { value: 'strength', comment: 'Enable superstrength' },
    { value: 'vision', comment: 'Enable X-ray vision' }
  ])
  t.is(result, 'labeled')
})

test.serial('mixed', t => {
  unlabeled.returns('unlabeled')
  labeled.returns('labeled')
  const result = note([
    { value: 'speed', comment: 'Enable superspeed' },
    { comment: 'Enable superstrength' },
    { value: 'vision', comment: 'Enable X-ray vision' }
  ])
  t.is(result, '' +
`unlabeled
labeled`)
})
