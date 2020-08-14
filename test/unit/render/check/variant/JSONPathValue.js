const test = require('ava')

const { parse } = require('helper/parse.js')

const JSONPathValue = require('render/check/variant/JSONPathValue')
const { CheckCondition } = require('enum')

test('generates strict equality check when check condition is Equals', (t) => {
  const result = parse(
    JSONPathValue('check name', {
      expression: '$.value',
      condition: CheckCondition.Equals,
      value: 'True',
      state: { negated: false },
    })
  )

  const expected = parse(`
    response => jsonpath.query(response.json(), "$.value")
      .some(value => value === "True")
  `)

  t.deepEqual(result, expected)
})

test('checks if value is a member of list when check condition is Contains', (t) => {
  const result = parse(
    JSONPathValue('check name', {
      expression: '$.value',
      condition: CheckCondition.Contains,
      value: '200 OK',
      state: { negated: false },
    })
  )

  const expected = parse(`
    response => jsonpath.query(response.json(), "$.value")
      .some(values => values.includes("200 OK"))
  `)

  t.deepEqual(result, expected)
})

test('checks if value is not a member of list when check condition is NotContains', (t) => {
  const result = parse(
    JSONPathValue('check name', {
      expression: '$.value',
      condition: CheckCondition.Contains,
      value: '200 OK',
      state: { negated: false },
    })
  )

  const expected = parse(`
    response => jsonpath.query(response.json(), "$.value")
      .some(values => values.includes("200 OK"))
  `)

  t.deepEqual(result, expected)
})

test('checks if value starts with value when check condition is StartsWith', (t) => {
  const result = parse(
    JSONPathValue('check name', {
      expression: '$.value',
      condition: CheckCondition.StartsWith,
      value: '200',
      state: { negated: false },
    })
  )

  const expected = parse(`
    response => jsonpath.query(response.json(), "$.value")
      .some(value => value.startsWith("200"))
  `)

  t.deepEqual(result, expected)
})

test('checks if value ends with value when check condition is EndsWith', (t) => {
  const result = parse(
    JSONPathValue('check name', {
      expression: '$.value',
      condition: CheckCondition.EndsWith,
      value: 'OK',
      state: { negated: false },
    })
  )

  const expected = parse(`
    response => jsonpath.query(response.json(), "$.value")
      .some(value => value.endsWith("OK"))
  `)

  t.deepEqual(result, expected)
})

test('checks if value has correct type using typeof operator when check condition is TypeOf', (t) => {
  const result = parse(
    JSONPathValue('check name', {
      expression: '$.value',
      condition: CheckCondition.TypeOf,
      value: 'string',
      state: { negated: false },
    })
  )

  const expected = parse(`
    response => jsonpath.query(response.json(), "$.value")
      .some(value => typeof value === "string")
  `)

  t.deepEqual(result, expected)
})

test('checks if value is an array when check condition is TypeOf and expected type is "array"', (t) => {
  const result = parse(
    JSONPathValue('check name', {
      expression: '$.value',
      condition: CheckCondition.TypeOf,
      value: 'array',
      state: { negated: false },
    })
  )

  const expected = parse(`
    response => jsonpath.query(response.json(), "$.value")
      .some(value => Array.isArray(value))
  `)

  t.deepEqual(result, expected)
})
