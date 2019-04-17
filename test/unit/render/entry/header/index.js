import test from 'ava'
import isolate from 'helper/isolate'
const [ header, { comment, main } ] =
  isolate(test, 'render/entry/header', {
    comment: 'render/comment',
    main: 'render/entry/header/main'
  })

test.serial('empty', t => {
  main.returns(null)
  const result = header({})
  t.is(result, null)
  t.true(comment.notCalled)
})

test.serial('main', t => {
  main.returns('Perform log in')
  header({})
  t.true(comment.calledOnce)
  t.is(comment.firstCall.args[0], 'Perform log in')
})
