const test = require('ava')
const isolate = require('helper/isolate')
const { CheckType } = require('enum')
const [checkName, { computed }] = isolate(test, 'string/check/name', {
  computed: 'string/check/name/computed',
})

test.serial('computed', t => {
  const result = Symbol('result')
  computed.returns(result)
  const name = checkName({ type: CheckType.JSONPath, expression: 'token' })
  t.is(name, result)
})
