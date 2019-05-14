import test from 'ava'
import isolate from 'helper/isolate'
const [ item, { comment } ] =
  isolate(test, 'render/chain/item', { comment: 'render/comment' })

test.serial('basic', t => {
  const result = item({ call: `filter(item => item)` })
  t.is(result, `.filter(item => item)`)
})

test.serial('comment line', t => {
  comment.returns(`// Remove empty items`)
  const result = item({
    call: `filter(item => item)`,
    comment: 'Remove empty items'
  })
  t.is(result, `.filter(item => item) // Remove empty items`)
})

test.serial('comment multiline', t => {
  comment.returns('' +
`/*
 * Process items
 * Translates records into objects
 */`)
  const result = item({
    call: `map(item => process(item))`,
    comment: 'Process item\nTranslates records into objects'
  })
  t.is(result, '' +
`/*
 * Process items
 * Translates records into objects
 */
.map(item => process(item))`)
})
