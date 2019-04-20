import test from 'ava'
import isolate from 'helper/isolate'
import { assay as makeAssay } from 'make'
const [ headers, { header } ] =
  isolate(test, 'validate/headers', { header: 'validate/header' })

test.serial('invalid header 0', t => {
  t.throws(() => {
    headers([ 5 ], 0, makeAssay())
  }, {
    name: 'InvalidHeader',
    message: 'Invalid header (0:0): must be object'
  })
})

test.serial('invalid header 2', t => {
  t.throws(() => {
    headers([ {}, {}, 5 ], 8, makeAssay())
  }, {
    name: 'InvalidHeader',
    message: 'Invalid header (8:2): must be object'
  })
})

test.serial('multiple Content-Type', t => {
  t.throws(() => {
    headers([
      { name: 'Content-Type' },
      { name: 'content-type' }
    ], 0, makeAssay())
  }, { name: 'MultipleContentType' })
})

test.serial('valid 0', t => {
  headers([], 0, makeAssay())
  t.true(header.notCalled)
})

test.serial('valid 1', t => {
  headers([ {} ], 0, makeAssay())
  t.true(header.calledOnce)
})

test.serial('valid 3', t => {
  headers([ {}, {}, {} ], 0, makeAssay())
  t.true(header.calledThrice)
})
