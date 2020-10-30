import test from 'ava'
import { requestFactor as makeRequestFactor } from 'make'
import query from 'render/address/query'

test.serial('empty', (t) => {
  const factor = makeRequestFactor()
  query(new Map(), factor)
  t.deepEqual(factor.pre, [])
})

test.serial('1', (t) => {
  const factor = makeRequestFactor()
  const spec = new Map().set(
    'search',
    new Set([{ value: 'kitten' }, { value: 'foobar' }])
  )

  query(spec, factor)

  t.deepEqual(factor.pre, [
    `address.searchParams.append("search", "kitten")\naddress.searchParams.append("search", "foobar")`,
  ])
})
