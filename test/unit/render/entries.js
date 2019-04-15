import test from 'ava'
import isolate from 'helper/isolate'
const [ entries, { entry } ] =
  isolate(test, 'render/entries', { entry: 'render/entry' })

test.serial('empty', t => {
  const result = entries([])
  t.is(result, null)
})

test.serial('1', t => {
  entry.returns(`// Entry`)
  const result = entries([ {} ])
  t.is(result, `// Entry`)
})

test.serial('3', t => {
  entry.returns(`// Entry`)
  const result = entries([ {}, {}, {} ])
  t.is(result, '' +
`// Entry

// Entry

// Entry`)
})
