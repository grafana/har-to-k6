import test from 'ava'
import isolate from 'helper/isolate'
import { CheckType } from 'enum'
const [ checkName, { computed } ] =
  isolate(test, 'string/check/name', {
    computed: 'string/check/name/computed'
  })

test.serial('computed', t => {
  const result = Symbol('result')
  computed.returns(result)
  const name = checkName({ type: CheckType.JSONPath, expression: 'token' })
  t.is(name, result)
})
