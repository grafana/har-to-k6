import test from 'ava'
import isolate from 'helper/isolate'
const [ header, { comment, main, query } ] =
  isolate(test, 'render/entry/header', {
    comment: 'render/comment',
    main: 'render/entry/header/main',
    query: 'render/entry/header/query'
  })

test.serial('empty', t => {
  main.returns(null)
  query.returns(null)
  const result = header({})
  t.is(result, null)
  t.true(comment.notCalled)
})

test.serial('main', t => {
  main.returns('Perform log in')
  query.returns(null)
  header({})
  t.true(comment.calledOnce)
  t.is(comment.firstCall.args[0], 'Perform log in')
})

test.serial('query', t => {
  main.returns(null)
  query.returns('' +
`Query string notes:
search: Find kittens`)
  header({})
  t.true(comment.calledOnce)
  t.is(comment.firstCall.args[0], '' +
`Query string notes:
search: Find kittens`)
})

test.serial('main query', t => {
  main.returns('Exercise search application')
  query.returns('' +
`Query string notes:
search: Find kittens`)
  header({})
  t.true(comment.calledOnce)
  t.is(comment.firstCall.args[0], '' +
`Exercise search application

Query string notes:
search: Find kittens`)
})
