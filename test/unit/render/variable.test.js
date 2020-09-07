import test from 'ava'

import variable from 'render/variable'
import { parse } from 'helper/parse'

import { VariableType } from 'enum'
import { parseComments } from '../../helper/parse'

test('Regex', (t) => {
  const result = parse(
    variable('token', {
      type: VariableType.Regex,
      expression: '^token: (.+)$',
    })
  )

  const expected = parse(`
    match = new RegExp("^token: (.+)$")
      .exec(response.body);

    vars["token"] = match ? match[1] || match[0] : null;
  `)

  t.deepEqual(result, expected)
})

test('JSONPath', (t) => {
  const result = parse(
    variable('token', {
      type: VariableType.JSONPath,
      expression: '$.token',
    })
  )

  const expected = parse(`
    vars["token"] = jsonpath.query(response.json(), "$.token")[0]
  `)

  t.deepEqual(result, expected)
})

test('should select innerHTML when no attribute was given when using CSSSelector', (t) => {
  const result = parse(
    variable('token', {
      type: VariableType.CSSSelector,
      expression: 'input[name=username]',
    })
  )

  const expected = parse(`
    vars["token"] = response
      .html()
      .find("input[name=username]")
      .first()
      .html()
  `)

  t.deepEqual(result, expected)
})

test('should select attribute by name if given when using CSSSelector', (t) => {
  const result = parse(
    variable('token', {
      type: VariableType.CSSSelector,
      attribute: 'value',
      expression: 'input[name=username]',
    })
  )

  const expected = parse(`
    vars["token"] = response
      .html()
      .find("input[name=username]")
      .first()
      .attr("value")
  `)

  t.deepEqual(result, expected)
})

test('comment', (t) => {
  const result = parseComments(
    variable('token', {
      type: VariableType.Regex,
      expression: '^token: (.+)$',
      comment: 'Extract authorization token',
    })
  )

  t.deepEqual(result, [
    { isBlock: false, text: ' Extract authorization token', line: 1 },
  ])
})
