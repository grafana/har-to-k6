import test from 'ava'
import isolate from 'helper/isolate'
import { entrySpec as makeEntrySpec } from 'make'
const [ entries, { entry } ] =
  isolate(test, 'render/entries', { entry: 'render/entry' })

test.serial('empty', t => {
  const result = entries([])
  t.is(result, null)
})

test.serial('1', t => {
  entry.returns(`// Entry`)
  const result = entries([ makeEntrySpec() ])
  t.is(result, `// Entry`)
})

test.serial('3 compact', t => {
  entry.returns(`// Entry`)
  const result = entries([ makeEntrySpec(), makeEntrySpec(), makeEntrySpec() ])
  t.is(result, '' +
`// Entry
// Entry
// Entry`)
})

test.serial('3 expanded', t => {
  entry.returns(`// Entry`)
  const complex = makeEntrySpec()
  complex.state.expanded = true
  const result = entries([ complex, makeEntrySpec(), makeEntrySpec() ])
  t.is(result, '' +
`// Entry

// Entry

// Entry`)
})
