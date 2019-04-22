import test from 'ava'
import isolate from 'helper/isolate'
import { CheckCondition, CheckSubject } from 'enum'
import { checkState as makeCheckState } from 'make'
const [ Text, { comparison, indent, string, subject } ] =
  isolate(test, 'render/check/variant/Text', {
    comparison: 'render/check/comparison',
    indent: 'render/indent',
    string: 'render/string',
    subject: 'render/check/subject'
  })

test.serial('subject', t => {
  const spec = {
    subject: CheckSubject.ResponseBody,
    condition: CheckCondition.Contains,
    value: 'Logged in',
    state: makeCheckState()
  }
  spec.state.negated = false
  spec.state.plural = false
  Text('body contains Logged in', spec)
  t.true(subject.calledOnce)
  t.is(subject.firstCall.args[0], CheckSubject.ResponseBody)
})

test.serial('comparison', t => {
  string.returns('"Logged in"')
  const spec = {
    subject: CheckSubject.ResponseBody,
    condition: CheckCondition.Contains,
    value: 'Logged in',
    state: makeCheckState()
  }
  spec.state.negated = false
  spec.state.plural = false
  Text('body contains Logged in', spec)
  t.true(comparison.calledOnce)
  t.is(comparison.firstCall.args[0], CheckCondition.Contains)
  t.is(comparison.firstCall.args[1], '"Logged in"')
  t.is(string.firstCall.args[0], 'Logged in')
})

test.serial('positive singular', t => {
  subject.returns('subject')
  comparison.returns('comparison')
  const spec = {
    subject: CheckSubject.ResponseBody,
    condition: CheckCondition.Contains,
    value: 'Logged in',
    state: makeCheckState()
  }
  spec.state.negated = false
  spec.state.plural = false
  const result = Text('body contains Logged in', spec)
  t.deepEqual(result, {
    name: 'body contains Logged in',
    value: 'response => subjectcomparison'
  })
})

test.serial('positive plural', t => {
  subject.returns('subject')
  comparison.returns('comparison')
  indent.returns('indented')
  const spec = {
    subject: CheckSubject.ResponseHeaders,
    condition: CheckCondition.Equals,
    value: 'Content-Type: text/html',
    state: makeCheckState()
  }
  spec.state.negated = false
  spec.state.plural = true
  const result = Text('header equals Content-Type: text/html', spec)
  t.deepEqual(result, {
    name: 'header equals Content-Type: text/html',
    value: '' +
`response => {
indented
}`
  })
  t.is(indent.firstCall.args[0], '' +
`const values = subject;
return !!values.find(value => valuecomparison);`)
})

test.serial('negative singular', t => {
  subject.returns('subject')
  comparison.returns('comparison')
  const spec = {
    subject: CheckSubject.ResponseBody,
    condition: CheckCondition.NotContains,
    value: 'Login failed',
    state: makeCheckState()
  }
  spec.state.negated = true
  spec.state.plural = false
  const result = Text('body does not contain Login failed', spec)
  t.deepEqual(result, {
    name: 'body does not contain Login failed',
    value: 'response => !subjectcomparison'
  })
})

test.serial('negative plural', t => {
  subject.returns('subject')
  comparison.returns('comparison')
  indent.returns('indented')
  const spec = {
    subject: CheckSubject.ResponseHeaders,
    condition: CheckCondition.NotContains,
    value: 'text/csv',
    state: makeCheckState()
  }
  spec.state.negated = true
  spec.state.plural = true
  const result = Text('header does not contain text/csv', spec)
  t.deepEqual(result, {
    name: 'header does not contain text/csv',
    value: '' +
`response => {
indented
}`
  })
  t.is(indent.firstCall.args[0], '' +
`const values = subject;
return !values.find(value => valuecomparison);`)
})
