import test from 'ava'
import isolate from 'helper/isolate'
import { CheckSubject } from 'enum'
import { checkState as makeCheckState } from 'make'
const [ Regex, { indent, string, subject } ] =
  isolate(test, 'render/check/variant/Regex', {
    indent: 'render/indent',
    string: 'render/string',
    subject: 'render/check/subject'
  })

test.serial('subject', t => {
  const spec = {
    subject: CheckSubject.ResponseBody,
    expression: 'User (.+) logged in',
    state: makeCheckState()
  }
  spec.state.negated = false
  spec.state.plural = false
  Regex('body matches User (.+) logged in', spec)
  t.true(subject.calledOnce)
  t.is(subject.firstCall.args[0], CheckSubject.ResponseBody)
})

test.serial('singular', t => {
  subject.returns('subject')
  string.returns('expression')
  indent.returns('indented')
  const spec = {
    subject: CheckSubject.ResponseBody,
    expression: 'User (.+) logged in',
    state: makeCheckState()
  }
  spec.state.negated = false
  spec.state.plural = false
  const result = Regex('body matches User (.+) logged in', spec)
  t.deepEqual(result, {
    name: 'body matches User (.+) logged in',
    value: '' +
`response => {
indented
}`
  })
  t.is(subject.firstCall.args[0], CheckSubject.ResponseBody)
  t.is(string.firstCall.args[0], 'User (.+) logged in')
  t.is(indent.firstCall.args[0], '' +
`const expr = new RegExp(expression);
return expr.test(subject);`)
})

test.serial('plural', t => {
  subject.returns('subject')
  string.returns('expression')
  indent.returns('indented')
  const spec = {
    subject: CheckSubject.ResponseHeaders,
    expression: 'text/.+',
    state: makeCheckState()
  }
  spec.state.negated = false
  spec.state.plural = true
  const result = Regex('header matches text/.+', spec)
  t.deepEqual(result, {
    name: 'header matches text/.+',
    value: '' +
`response => {
indented
}`
  })
  t.is(subject.firstCall.args[0], CheckSubject.ResponseHeaders)
  t.is(string.firstCall.args[0], 'text/.+')
  t.is(indent.firstCall.args[0], '' +
`const values = subject;
const expr = new RegExp(expression);
return !!values.find(value => expr.test(value));`)
})
