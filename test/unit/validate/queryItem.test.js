const test = require('ava')
const queryItem = require('validate/queryItem')

test('should ignore errors when name is empty', t => {
  t.notThrows(() => {
    queryItem({ name: null, value: 123 }, 0, 0)
  })
})

test('it should throw when name is invalid', t => {
  t.throws(
    () => {
      queryItem({ name: 5 }, 0, 0)
    },
    { name: 'InvalidQueryItemName' }
  )
})

test('it should throw when value is invalid', t => {
  t.throws(
    () => {
      queryItem({ name: 'search', value: 5 }, 0, 0)
    },
    { name: 'InvalidQueryItemValue' }
  )
})

test('it should throw when comment is invalid', t => {
  t.throws(
    () => {
      queryItem({ name: 'search', comment: 5 }, 0, 0)
    },
    { name: 'InvalidQueryStringComment' }
  )
})

test('it should not throw when given only a name', t => {
  t.notThrows(() => {
    queryItem({ name: 'search' }, 0, 0)
  })
})

test('it should not throw when given an empty value', t => {
  t.notThrows(() => {
    queryItem({ name: 'search', value: '' }, 0, 0)
  })
})

test('it should not throw when all values are valid', t => {
  t.notThrows(() => {
    queryItem(
      {
        name: 'search',
        value: 'kitten',
        comment: 'Typical search',
      },
      0,
      0
    )
  })
})
