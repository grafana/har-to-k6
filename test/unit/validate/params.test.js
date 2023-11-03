const test = require('ava')
const isolate = require('helper/isolate')
const { assay: makeAssay } = require('make')
const [params, { param }] = isolate(test, 'validate/params', {
  param: 'validate/param',
})

test.serial('invalid param 0', t => {
  t.throws(
    () => {
      params([5], 0, makeAssay())
    },
    {
      name: 'InvalidParam',
      message: 'Param must be a plain object',
    }
  )
})

test.serial('invalid param 2', t => {
  t.throws(
    () => {
      params([{}, {}, 5], 8, makeAssay())
    },
    {
      name: 'InvalidParam',
      message: 'Param must be a plain object',
    }
  )
})

test.serial('valid 0', t => {
  params([], 0, makeAssay())
  t.true(param.notCalled)
})

test.serial('valid 1', t => {
  params([{}], 0, makeAssay())
  t.true(param.calledOnce)
})

test.serial('valid 3', t => {
  params([{}, {}, {}], 0, makeAssay())
  t.true(param.calledThrice)
})
