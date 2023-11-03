const test = require('ava')
const aid = require('aid')

test('extrinsic', t => {
  const enumeration = {
    First: 0,
    Second: 1,
    Third: 2,
  }
  const value = aid.extrinsic(enumeration)
  t.false(Object.values(enumeration).includes(value))
})
