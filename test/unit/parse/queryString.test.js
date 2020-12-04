import test from 'ava'
import isolate from 'helper/isolate'
const [queryString, { queryItem }] = isolate(test, 'parse/queryString', {
  queryItem: 'parse/queryItem',
})

function makeSpec() {
  return new Map()
}

function makeState() {
  return {
    variable: false,
  }
}

test.serial('empty', (t) => {
  queryString([], '', makeSpec(), makeState())
  t.true(queryItem.notCalled)
})

test.serial('1', (t) => {
  queryString([{}], '', makeSpec(), makeState())
  t.true(queryItem.calledOnce)
})

test.serial('3', (t) => {
  queryString([{}, {}, {}], '', makeSpec(), makeState())
  t.true(queryItem.calledThrice)
})

test.serial('in request', (t) => {
  queryString(
    [
      { name: '__test__', value: '1' },
      { name: 'param', value: true },
    ],
    'https://test.k6.io?param=true',
    makeSpec(),
    makeState()
  )
  t.true(queryItem.calledOnce)
})

test.serial('invalid request url', (t) => {
  queryString(
    [
      { name: '__test__', value: '1' },
      { name: 'param', value: true },
    ],
    '${protocol}test.k6.io?param=true',
    makeSpec(),
    makeState()
  )
  t.true(queryItem.calledOnce)
})
