import test from 'ava'
import aid from 'aid'

test('extrinsic', t => {
  const enumeration = Object.freeze({
    First: 0,
    Second: 1,
    Third: 2
  })
  const value = aid.extrinsic(enumeration)
  t.false(Object.values(enumeration).includes(value))
})
