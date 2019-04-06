import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
const entry = sinon.stub()
let entries

test.before(t => {
  mockRequire('../../../src/validate/entry', entry)
  entries = require('validate/entries')
})

test.afterEach.always(t => {
  entry.reset()
})

test.serial('invalid entry 0', t => {
  t.throws(() => {
    entries([ 5 ])
  }, {
    name: 'InvalidEntry',
    message: 'Invalid entry (0): must be object'
  })
})

test.serial('invalid entry 2', t => {
  t.throws(() => {
    entries([ {}, {}, 5 ])
  }, {
    name: 'InvalidEntry',
    message: 'Invalid entry (2): must be object'
  })
})

test.serial('valid 0', t => {
  t.notThrows(() => {
    entries([])
  })
})

test.serial('valid 1', t => {
  t.notThrows(() => {
    entries([ {} ])
  })
})

test.serial('valid 3', t => {
  t.notThrows(() => {
    entries([ {}, {}, {} ])
  })
})
