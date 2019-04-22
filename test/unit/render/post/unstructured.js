import test from 'ava'
import isolate from 'helper/isolate'
const [ unstructured, { text } ] =
  isolate(test, 'render/post/unstructured', { text: 'render/text' })

test.serial('empty', t => {
  text.returns('""')
  const post = {}
  const result = unstructured({ post })
  t.is(result, '""')
  t.true(text.calledOnce)
  t.is(text.firstCall.args[0], '')
})

test.serial('nonempty', t => {
  text.returns('"Good post"')
  const post = { value: 'Good post' }
  const result = unstructured({ post })
  t.is(result, '"Good post"')
  t.true(text.calledOnce)
  t.is(text.firstCall.args[0], 'Good post')
})
