import test from 'ava'
import { parse } from '../../../../helper/parse'
import JSONPath from '../../../../../src/render/check/variant/JSONPath'
import { CheckCondition } from '../../../../../src/enum'

test('should check if jsonpath exists', (t) => {
  const result = parse(
    JSONPath('check name', {
      expression: '$.value',
      condition: CheckCondition.Equals,
      value: 'True',
      state: { negated: false },
    })
  )

  const expected = parse(`
    response => jsonpath.query(response.json(), "$.value").length > 0
  `)

  t.deepEqual(result, expected)
})
