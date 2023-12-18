const test = require('ava')
const isolate = require('helper/isolate')
const { result: makeResult, requestSpec: makeRequestSpec } = require('make')
const [entry, { checks, request, variables, sleep }] = isolate(
  test,
  'parse/entry',
  {
    checks: 'parse/checks',
    request: 'parse/request',
    variables: 'parse/variables',
    sleep: 'parse/sleep',
  }
)

test.serial('basic', t => {
  const result = makeResult()
  entry({}, result)
  t.deepEqual(result.entries, [
    {
      page: null,
      request: makeRequestSpec(),
      checks: new Map(),
      variables: new Map(),
      sleep: null,
      state: { expanded: true },
      webSocketMessages: [],
      addSleep: false,
    },
  ])
  t.true(request.calledOnce)
  t.true(checks.notCalled)
  t.true(variables.notCalled)
})

test.serial('page', t => {
  const result = makeResult()
  entry({ pageref: 'page1' }, result)
  t.is(result.entries[0].page, 'page1')
})

test.serial('comment', t => {
  const result = makeResult()
  entry({ comment: 'Test home page' }, result)
  t.is(result.entries[0].comment, 'Test home page')
})

test.serial('checks', t => {
  entry({ checks: [] }, makeResult())
  t.true(checks.calledOnce)
})

test.serial('variables', t => {
  entry({ variables: [] }, makeResult())
  t.true(variables.calledOnce)
})

test.serial('sleep', t => {
  entry({ sleep: 1200 }, makeResult())
  t.true(sleep.calledOnce)
})

test.serial('webSocketMessages', t => {
  let testMessage = 'Hello I am a test message'
  let node = { time: 420, _webSocketMessages: [testMessage] }
  let result = makeResult()
  entry(node, result)
  t.is(result.entries[0].webSocketMessages[0], testMessage)
})
