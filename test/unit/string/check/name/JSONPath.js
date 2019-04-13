import test from 'ava'
import JSONPath from 'string/check/name/JSONPath'

test('expression exists', t => {
  const name = JSONPath({
    expression: '$.store.book[*]'
  })
  t.is(name, '$.store.book[*] exists')
})
