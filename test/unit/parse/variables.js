import test from 'ava'
import isolate from 'helper/isolate'
const [ variables, { variable } ] =
  isolate(test, 'parse/variables', { variable: 'parse/variable' })

function makeSpec () {
  return new Map()
}

test.serial('empty', t => {
  variables([], makeSpec())
  t.true(variable.notCalled)
})

test.serial('1', t => {
  variables([ {} ], makeSpec())
  t.true(variable.calledOnce)
})

test.serial('3', t => {
  variables([ {}, {}, {} ], makeSpec())
  t.true(variable.calledThrice)
})
