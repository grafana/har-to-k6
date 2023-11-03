const test = require('ava')
const isolate = require('helper/isolate')
const { assay: makeAssay } = require('make')
const [headers, { header }] = isolate(test, 'validate/headers', {
  header: 'validate/header',
})

test.serial('invalid header 0', t => {
  t.throws(
    () => {
      headers([5], 0, makeAssay())
    },
    {
      name: 'InvalidHeader',
      message: 'Header must be a plain object',
    }
  )
})

test.serial('invalid header 2', t => {
  t.throws(
    () => {
      headers([{}, {}, 5], 8, makeAssay())
    },
    {
      name: 'InvalidHeader',
      message: 'Header must be a plain object',
    }
  )
})

test.serial('multiple Content-Type', t => {
  t.throws(
    () => {
      headers(
        [{ name: 'Content-Type' }, { name: 'content-type' }],
        0,
        makeAssay()
      )
    },
    { name: 'MultipleContentType' }
  )
})

test.serial('valid 0', t => {
  headers([], 0, makeAssay())
  t.true(header.notCalled)
})

test.serial('valid 1', t => {
  headers([{}], 0, makeAssay())
  t.true(header.calledOnce)
})

test.serial('valid 3', t => {
  headers([{}, {}, {}], 0, makeAssay())
  t.true(header.calledThrice)
})
