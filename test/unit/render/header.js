import test from 'ava'
import isolate from 'helper/isolate'
const [ header, { comment } ] =
  isolate(test, 'render/header', { comment: 'render/comment' })

test.serial('empty', t => {
  const result = header({ comment: [] })
  t.is(result, null)
  t.true(comment.notCalled)
})

test.serial('1 line', t => {
  const rendered = Symbol('rendered')
  comment.returns(rendered)
  const result = header({ comment: [ 'Creator: WebTracer' ] })
  t.true(comment.calledOnce)
  t.is(comment.firstCall.args[0], 'Creator: WebTracer')
  t.is(result, rendered)
})

test.serial('3 lines', t => {
  const rendered = Symbol('rendered')
  comment.returns(rendered)
  const result = header({ comment: [
    'Creator: WebTracer',
    'Captured on 20180504',
    'Browser: Brave'
  ] })
  t.true(comment.calledOnce)
  t.is(
    comment.firstCall.args[0],
    'Creator: WebTracer' +
      '\nCaptured on 20180504' +
      '\nBrowser: Brave'
  )
  t.is(result, rendered)
})
