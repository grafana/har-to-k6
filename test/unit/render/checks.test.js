const test = require('ava')
const checks = require('render/checks')
const { parse } = require('helper/parse')

const checkProto = {
  type: 2,
  state: { negated: false, plural: true },
  subject: 1,
  condition: 0,
  expression: '$.user.name',
}

test.serial('1', t => {
  let expectedResult = `
    check(response, {
      "test": response => jsonpath.query(response.json(), "$.user.name").length > 0
    });`

  const result = checks(new Map().set('test', checkProto))
  t.deepEqual(parse(result), parse(expectedResult))
})

test.serial('3', t => {
  let expectedResult = `
    check(response, {
      "$.status is success": response => jsonpath.query(response.json(), "$.user.name").length > 0,
      "$.results is 7": response => jsonpath.query(response.json(), "$.user.name").length > 0,
      "$.result[0].name is Kitten": response => jsonpath.query(response.json(), "$.user.name").length > 0
    });`

  const spec = new Map()
    .set('$.status is success', checkProto)
    .set('$.results is 7', checkProto)
    .set('$.result[0].name is Kitten', checkProto)

  const result = checks(spec)
  t.deepEqual(parse(result), parse(expectedResult))
})
