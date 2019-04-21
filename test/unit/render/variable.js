import test from 'ava'
import isolate from 'helper/isolate'
import { VariableType } from 'enum'
const [ variable, { comment, string, text } ] =
  isolate(test, 'render/variable', {
    comment: 'render/comment',
    string: 'render/string',
    text: 'render/text'
  })

test.serial('Regex', t => {
  string.returns('"^token: (.+)$"')
  text.returns('"token"')
  const result = variable('token', {
    type: VariableType.Regex,
    expression: '^token: (.+)$'
  })
  t.is(string.firstCall.args[0], '^token: (.+)$')
  t.is(text.firstCall.args[0], 'token')
  t.is(result, '' +
`match = new RegExp("^token: (.+)$").exec(response.body);
vars["token"] = match ? match[1] || match[0] : null;`)
})

test.serial('JSONPath', t => {
  string.returns('"$.token"')
  text.returns('"token"')
  const result = variable('token', {
    type: VariableType.JSONPath,
    expression: '$.token'
  })
  t.is(string.firstCall.args[0], '$.token')
  t.is(text.firstCall.args[0], 'token')
  t.is(
    result,
    `vars["token"] = jsonpath.query(response.json(), "$.token");`
  )
})

test.serial('comment', t => {
  comment.returns(`// Extract authorization token`)
  string.returns('expression')
  text.returns('name')
  const result = variable('token', {
    type: VariableType.Regex,
    expression: '^token: (.+)$',
    comment: 'Extract authorization token'
  })
  t.is(comment.firstCall.args[0], 'Extract authorization token')
  t.is(result, '' +
`// Extract authorization token
match = new RegExp(expression).exec(response.body);
vars[name] = match ? match[1] || match[0] : null;`)
})
